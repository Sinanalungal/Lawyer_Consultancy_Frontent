import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChatComponent from '../../../components/chat/Chat';

function LawyerChat() {
    const { Id } = useParams();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    console.log(Id);
    
  return (
    <><ChatComponent send_to_id={Id} path={'/lawyer/chat/'} /></>
  )
}

export default LawyerChat