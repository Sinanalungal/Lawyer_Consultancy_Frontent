import { useParams } from 'react-router-dom';
import ChatComponent from '../../../components/chat/Chat'
import { useEffect } from 'react';

function UserChat() {
    const { Id } = useParams();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    console.log(Id);
    
  return (
    <><ChatComponent send_to_id={Id} path={'/user/chat/'} /></>
  )
}

export default UserChat