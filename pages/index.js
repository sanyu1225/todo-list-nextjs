import gql from 'graphql-tag'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, IconButton, ListItemButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import BackupIcon from '@mui/icons-material/Backup';
import { Title, CheckIcon, ListItemText, Input } from './style'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      status
      text
    }
  }
`

const Index = () => {

  const {
    loading,
    data: { viewer },
  } = useQuery(ViewerQuery)



  const [inputValue, setInputValue] = useState('')
  const [viewList, setViewList] = useState([{ text: 'bar', status: 0 }, { text: 'foo', status: 1 }, { text: 'baz', status: 0} ])
  const [inputStatus, setInputStatus] = useState('add')
  
  useEffect(()=>{
    console.log('effect on viewer',viewer);
    setViewList(viewer)
  },[viewer])

  useEffect(()=>{
    console.log('loading effect ',loading);
  },[loading])

  /** 新增 */
  const addItem = () => {
    setViewList(arr => [...arr,{ text: inputValue, status:0 }]);
  }

  /** 
   * @param {Number} - idx index
   * @param {String} - text 顯示文字
   * @param {String} - action 刪除或編輯
   * 修改 刪除 */
  const itemClick = (idx,action,text) => {
    if(action === 'delete'){
      console.log('in delete',idx);
      return
    }
    if(action === 'edit'){
      console.log('in edit',text);
      setViewList(
        viewList.map((item,index) => 
            idx === index 
            ? {...item, isEdit : !item.isEdit } 
            : {...item, isEdit : !!item.isEdit } 
      ))
      //todo 在查詢新資料
      return
    }
  }

  return (
    // <div style={{ 'backgroundColor' : '#2d2d2d'}}>
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='content'>
        <Title> 
          TODO LIST
        </Title>
        <br/>
        {
          loading ? <CircularProgress /> :
          <List>
            {viewList.map((item,idx) => (
                <ListItem
                  disablePadding
                  key={idx}
                  secondaryAction={
                    <>
                    <IconButton edge="end" onClick={() => itemClick(idx, 'edit', item.text)}>
                      {
                        item.isEdit ? <BackupIcon /> : <EditIcon />
                      }
                    </IconButton>
                    <IconButton edge="end" onClick={() => itemClick(idx, 'delete')}>
                      <CloseIcon />
                    </IconButton>
                    </>
                  }
              >
                  <ListItemButton >
                    <CheckIcon fill={ item.status === 0 ? '#61dafb': 'red'} />
                    {item?.isEdit ? 
                    <Input defaultValue={item.text} size="large" placeholder="please enter something..." /> 
                    : <ListItemText
                      primary={item.text}
                      status={item.status}
                    />}
                    
                </ListItemButton>
              </ListItem>
            ))}

          </List>
        }
        {/* input group */}
        <TextField size='small' placeholder='add a new todo...' value={inputValue} onChange={({ target:{ value } }) => setInputValue(value)} />
        <Button variant="contained" onClick={ addItem } disabled={!inputValue} >
          Add
        </Button>
      </div>
      <>
      {
        viewer.map(e => {
          <div>
            <p>Text: {e.Text}</p>
            <p>status: {e.status}</p>
          </div>
        })
      }
      {
        JSON.stringify(viewer)
      }
      </>

      <Link href="/about">
        <a>static</a>
      </Link>{' '}
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
