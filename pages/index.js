import gql from 'graphql-tag'
import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { useState } from 'react';
import { Button, ListItem, IconButton, ListItemButton, CircularProgress, Dialog, DialogTitle, DialogActions, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title, Content, CheckIcon, ListItemText, List, TextField, CusButton } from '../styles'
import { ADD_TODO, GET_TODOS, EDIT_TODOS, DELETE_TODO } from './api/todos';


const Index = () => {

  const { loading, data: { getTodos } } = useQuery(GET_TODOS)
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => setInputValue('')
  })
  const [editTodo] = useMutation(EDIT_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [inputValue, setInputValue] = useState('') // 輸入欄
  const [dialogStatus, setDialogStatus] = useState(false);
  const [nowDeleteData, setnowDeleteData] = useState(null)

  /** 新增一筆todos */
  const addTodoApi = async () => {
    if(!inputValue) return 
    await addTodo({ 
      variables: { input: { text: inputValue.trim() , status: 0 } },
      refetchQueries: [
        { query: GET_TODOS }
      ]
    });
  }

  /** 修改todos狀態 */
  const editTodoHandler = async ({id,status}) => {
    await editTodo({ 
      variables: { id, input: { status: status === 0 ? 1 : 0 } }
    });
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
    }
  }

  return (
    <div style={{ 'backgroundColor':'#2d2d2d' }}>
      <Head>
        <title>Todo List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <Title> 
          TODO LIST
        </Title>
        {
          loading ? <CircularProgress /> :
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
        <TextField size='small' placeholder='add a new todo...' value={inputValue} onChange={({ target:{ value } }) => setInputValue(value)} />
        <CusButton variant="contained" onClick={ () => addTodoApi() } >
          Add
        </CusButton>
        {/* delete dialog */}
        <Dialog 
          open={dialogStatus}
        >
          <DialogTitle>
            {`Delete ${nowDeleteData?.text} ?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={()=> setDialogStatus(false)}>No</Button>
            <Button onClick={deleteTodoHandler} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Content>
    </div>
  )
}

export async function getStaticProps() {
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
