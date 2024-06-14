import { useNavigate, useParams } from 'react-router-dom';
import ChatComponent from '../../../components/chat/Chat'
import { useEffect, useState } from 'react';
import { getAxiosInstance } from '../../../services/axiosInstance/AxiosInstance';
import { BASE_URL } from '../../../constants';
import { useSelector } from 'react-redux';
import SubscriptionPage from '../subscription/SubscriptionPage';

function UserChat() {
    const [lawyer, setLawyer] = useState<any>(null);
    const [loader, setLoader] = useState(true);
    const [subscriptions, setSubscriptions] = useState([]);
    const { lawyerId } = useParams();
    const [detailModal,setDetailModal] = useState({open:false,detail:''})
    const {value}=useSelector((store)=>store.login)
    const [sessionPage,setSessionPage] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      setLoader(true);
      if (lawyer) {
        async function fetchDepartmentData() {
          try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.post(
              `${BASE_URL}subscriptions/lawyer_plans/${lawyer}`,{user_id:value}
            );
            
            setSubscriptions(response.data);
            console.log(response.data);
            console.log(lawyer,'this is the lawyer id');   
            setLoader(false);
          } catch (error) {
            console.log(error);
            if (error.response.status == 406){
              // navigate('user-session/')
              setSessionPage(true)
              // setDetailModal({open:true,detail:error.response.data.detail})
              
            }else if (error.response.status == 404 ){
              setDetailModal({open:false,detail:error.response.data.detail})
            }
            setLoader(false);
          }
        }
        fetchDepartmentData();
      }
    }, [lawyer]);
    
    useEffect(() => {
      setLoader(true);
      console.log(lawyerId);
      setLawyer(lawyerId);
    }, []);

   
    // const { Id } = useParams();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    // console.log(Id);
    
  return (
    <>{sessionPage &&<ChatComponent send_to_id={lawyerId} path={'/user/chat/'} />}
    {!sessionPage && <SubscriptionPage  lawyer={lawyer} loader={loader} subscriptions={subscriptions} detailModal={detailModal}/>}
    </>
  )
}

export default UserChat