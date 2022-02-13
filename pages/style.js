import CheckIcons from '@mui/icons-material/Check'
import styled from '@emotion/styled';
import { ListItemText as  ListItemTexts, 
         Input as Inputs ,List as Lists, 
         TextField as TextFields,
         Button
       } from '@mui/material';

export const Title = styled('h1')`
    color: #61dafb;
    margin-top: 0;
    margin-bottom: 10px;
`;

export const Content = styled('div')`
    padding: 1rem;
    height: 100vh;
    max-width: 850px;
    margin: 0 auto;
`

/** 打勾圖標 */
export const CheckIcon = styled(CheckIcons)`
    fill: ${props => props.fill };
`
/** 展示文字 */
export const ListItemText = styled(ListItemTexts)`
    color: ${props => props.status === 0 ? '#61dafb' : 'red'} ;
    text-decoration: ${props => props.status === 0 ? 'none' : 'line-through'} ;
`

/** 列表 */
export const List = styled(Lists)`
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 25px;
`

/** input輸入欄 */
export const TextField = styled(TextFields)`
    background-color: #fff;
    border-radius: 5px;
    margin-left: 10%;
`

/** 按鈕 */
export const CusButton = styled(Button)`
    background-color: #fff;
    color: #000;
    &:hover{
        background-color: #d9c8c8;
    }
`

