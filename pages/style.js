import CheckIcons from '@mui/icons-material/Check'
import styled from '@emotion/styled';
import { ListItemText as  ListItemTexts,Input as Inputs} from '@mui/material';
export const Title = styled('h1')`
    color: #61dafb;
    // background-color: ${props => props.bg};
`;

/** 打勾圖標 */
export const CheckIcon = styled(CheckIcons)`
    fill: ${props => props.fill };
`
/** 展示文字 */
export const ListItemText = styled(ListItemTexts)`
    color: ${props => props.status === 0 ? '#61dafb' : 'red'} ;
    text-decoration: ${props => props.status === 0 ? 'none' : 'line-through'} ;
`

/** 輸入框 */
export const Input = styled(Inputs)`
    width:100%;
`