import React from 'react';
import { toast } from 'react-toastify';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

interface DiscussionSectionProps {
  comments: Comment[];
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ comments,addComment,commentdata,submitFunction }) => {
 

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className=" mx-auto  max-sm:px-1 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg  lg:text-2xl font-bold text-gray-900 dark:text-white">Comments </h2>
        </div>
        {/* Form */}
        <form onSubmit={(e) => {
  e.preventDefault();
  if (commentdata !== "") {
    submitFunction();
  } else {
    toast.error('give a valid comment')
  }
}}>

          {/* Textarea */}
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              id="comment"
              rows={5}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              value={commentdata}
              onChange={(e)=>{addComment(e.target.value)}}
              required
            ></textarea>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex bg-black items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        {/* Comment Articles */}
        {comments.map(comment => (
          
          <article key={comment.id} className="p-6 max-sm:px-1 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex truncate  items-center max-sm:text-xs mr-3 text-[14px] text-gray-900 dark:text-white font-semibold">
                  <img className="mr-2  w-5  h-5  rounded-full" src={comment.avatar} alt={comment.author} />
                  {comment.author}
                </p>
                <p className="text-xs max-sm:hidden max-sm:text-xs flex text-gray-600 dark:text-gray-400"><p>{(new Date(comment.date)).toLocaleDateString("en-US", {
              day: "numeric",
              year: "numeric",
              month: "long",
            })}</p> &nbsp;<time dateTime={(new Date(comment.date)).toLocaleTimeString("en-US", {
                 hour: "numeric",
            minute: "numeric",
            hour12: true, 
            })}>{(new Date(comment.date)).toLocaleTimeString("en-US", {
                 hour: "numeric",
            minute: "numeric",
            hour12: true, 
            })}</time></p>
              </div>
              {/* Dropdown Button */}
              {/* Assuming you have logic to handle dropdown toggle */}
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              {/* Dropdown Menu */}
              {/* Assuming you have logic to show dropdown menu */}
              <div className="hidden"> {/* Dropdown content */}</div>
            </footer>
            {/* Comment Content */}
            <p className="text-gray-500 text-sm max-sm:text-[11px] dark:text-gray-400">{comment.content}</p>
            {/* Reply Button */}
            <div className="flex items-center max-[400px]:justify-between mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-xs max-sm:text-[11px] text-gray-500 hover:underline dark:text-gray-400 font-medium"
              >
                Reply
              </button>
              <p className="text-sm flex max-sm:text-[10px] sm:hidden text-gray-600 dark:text-gray-400"><p>{(new Date(comment.date)).toLocaleDateString("en-US", {
              day: "numeric",
              year: "numeric",
              month: "long",
            })}</p> &nbsp;<time dateTime={(new Date(comment.date)).toLocaleTimeString("en-US", {
                 hour: "numeric",
            minute: "numeric",
            hour12: true, 
            })}>{(new Date(comment.date)).toLocaleTimeString("en-US", {
                 hour: "numeric",
            minute: "numeric",
            hour12: true, 
            })}</time></p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DiscussionSection;
