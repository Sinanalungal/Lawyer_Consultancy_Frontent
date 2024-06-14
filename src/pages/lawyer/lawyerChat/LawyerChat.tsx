import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ChatComponent from '../../../components/chat/Chat';
import LawyerHome from '../home/LawyerHome';
import Breadcrumb from '../../../components/breadcrump/BreadCrump';

function LawyerChat() {
    const { Id } = useParams();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    console.log(Id);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: "Lawyer", link: "/lawyer" },
      { label: "chats" },
    ];
  return (
    <><LawyerHome ind={3} component={<div className=''><div className="p-6 font-semibold">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <div className='w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto'>
      User Chats
    </div><ChatComponent send_to_id={Id} path={'/lawyer/chat/'} /></div>}/>
</>
  )
}

export default LawyerChat
