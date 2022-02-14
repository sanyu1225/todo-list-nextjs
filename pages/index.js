import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import connectDb from '@/db/config';
import { useState } from 'react';
import { ListItem, IconButton, ListItemButton, CircularProgress, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title, Content, CheckIcon, ListItemText, List, TextField, CusButton } from '../styles'
import { ADD_TODO, GET_TODOS, EDIT_TODOS, DELETE_TODO } from '../graphql/queries';
import LoadingView from '../components/Loading'
import DialogView from '../components/Dialog'

const Index = () => {

  const { loading, data: { getTodos } , error } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => setInputValue('')
  })
  const [editTodo] = useMutation(EDIT_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [inputValue, setInputValue] = useState('') // 輸入欄
  const [dialogStatus, setDialogStatus] = useState(false); // 刪除提示彈窗
  const [nowDeleteData, setnowDeleteData] = useState(null) // 待刪除資料
  const [loadingState, setLoadingState] = useState(false) // 全局loading


  /** 新增一筆todos */
  const addTodoApi = async () => {
    if(!inputValue) return null
    try {
      setLoadingState(true)
      await addTodo({ 
        variables: { input: { text: inputValue.trim() , status: 0 } },
        refetchQueries: [
          { query: GET_TODOS }
        ]
      });
    } catch (error) {
      console.log('error: ', error);
    }finally{
      setLoadingState(false)
    }
  }

  /** 修改todos狀態 */
  const editTodoHandler = async ({id,status}) => {
    try {
      setLoadingState(true)
      await editTodo({ 
        variables: { id, input: { status: status === 0 ? 1 : 0 } }
      });
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoadingState(false)
    }
  }

  /** 刪除彈窗 */
  const handleClickOpen = (e = null, item) => {
    e?.stopPropagation();
    setnowDeleteData(item)
    setDialogStatus(true)
  };

  /** 刪除todo */
  const deleteTodoHandler = async () => {
    try {
      setLoadingState(true)
      await deleteTodo({
        variables: { id: nowDeleteData.id },
        update: cache => {
          const prevData = cache.readQuery({ query: GET_TODOS });
          const newTodos = prevData.getTodos.filter(todo => todo.id !== nowDeleteData.id);
          cache.writeQuery({ query: GET_TODOS, data: { getTodos: newTodos }});
        }
      })
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setDialogStatus(false)
      setLoadingState(false)
    }
  }

  const keyPressHandler = ({ key }) => {
    key === 'Enter' && addTodoApi()
  }

  if(error) return <div>error</div>

  return (
    <div style={{ 'backgroundColor':'#2d2d2d' }}>
      <Head>
        <title>Todo List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoadingView visible={loadingState} />
      <DialogView 
        dialogStatus={dialogStatus} 
        nowDeleteData={nowDeleteData} 
        setDialogStatus={setDialogStatus} 
        rightButtonClick={deleteTodoHandler}
      />
      <Content>
        <Title> 
          TODO LIST
        </Title>
        {
          loading ? <CircularProgress /> :
          !!getTodos?.length  &&
          <List>
            {getTodos.map((item,idx) => (
              <div key={idx}>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" onClick={(e) => handleClickOpen(e, item)}>
                      <CloseIcon />
                    </IconButton>
                  }
                  onClick={ () => editTodoHandler(item) }
              >
                  <ListItemButton >
                    <CheckIcon fill={ item.status === 0 ? '#61dafb': 'red'} />
                    <ListItemText
                      primary={item.text}
                      status={item.status}
                    />
                    
                </ListItemButton>
              </ListItem>
              <Divider />
              </div>
            ))}

          </List>
        }
        {/* input group */}
        <TextField onKeyPress={ (e) => keyPressHandler(e)} size='small' placeholder='add a new todo...' value={inputValue} onChange={({ target:{ value } }) => setInputValue(value)} />
        <CusButton variant="contained" onClick={ () => addTodoApi() } >
          Add
        </CusButton>

      </Content>
    </div>
  )
}

export async function getStaticProps() {
  await connectDb()
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GET_TODOS,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
