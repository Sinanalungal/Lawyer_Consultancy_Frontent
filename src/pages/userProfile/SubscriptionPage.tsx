import React from "react";

function SubscriptionPage() {
  return (
    <>
      <div className="p-1">
      <section className="relative overflow-hidden   rounded-xl from-[#46807E] ot max-w-[1500px]  mx-auto">
        <header className=" rounded-xl">
          <div className="mx-auto max-w-screen-xl bg-slate-50 px-4 py-8  sm:px-12 lg:px-24">
            <div className="sm:flex  sm:items-center  pb-8 border-b-2 sm:justify-between">
              <div className="text-center mx-auto ">
                <h1 className="text-2xl font-bold text-black sm:text-3xl">
                  Become a Legal Insider!
                </h1>

                <p className="mt-1.5 text-xs text-black">
                  Subscribe now for 24/7 help, video consultations, and direct
                  chat with top lawyers.🎉
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="relative flex mb-10 bg-slate-50 flex-col items-center justify-center max-[400px]:px-1  px-8 py-12 mx-auto md:px-12 lg:px-16 xl:px-36 max-w-7xl lg:py-16">
          <div className="grid grid-cols-1 gap-6 lg lg:grid-cols-3 gap-y-12">
            <div>
              <div className="px-4">
                <div className="flex items-center gap-3 text-black">
                  {/* <div className="text-5xl">✺</div> */}
                  <p className="font-mono text-lg font-medium">STARTER PACK</p>
                </div>
                <p className="mt-6 text-xs font-light text-black">
                  This plan is ideal for individual users and hobbyists who are
                  looking for essential functionalities to support their
                  projects.
                </p>
              </div>
              <div className="p-8 mt-4 shadow-2xl lg:shadow-black rounded-xl bg-gray-900 backdrop-blur-xl border-white/5 ring-1 ring-white/10">
                <ul
                  className="flex flex-col max-sm:text-xs text-sm text-gray-400 gap-y-3"
                  role="list"
                >
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Limited number of users</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Limited storage (1 GB)</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Basic support (email only)</span>
                  </li>
                </ul>
                <p className="mt-6 font-mono font-bold tracking-tighter">
                  <span className="text-4xl text-white lg:text-6xl"> $5</span>
                  <span className="text-base font-medium text-gray-500">
                    {" "}
                    /mo
                  </span>
                </p>
                <div className="flex mt-6 lg:mt-12">
                  <a
                    className="rounded-lg px-4 py-2 text-sm transition-all flex items-center justify-center text-white bg-gradient-to-b from-white/[.105] to-white/[.15] hover:to-white/[.25] h-10 ring-1 ring-inset ring-white/10 w-full"
                    href="#_"
                    aria-describedby="#_"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="flex items-center gap-3 text-black">
                  {/* <div className="text-5xl">❆</div> */}
                  <p className="font-mono text-lg font-medium">SILVER SURFER</p>
                </div>
                <p className="mt-6 text-xs font-light text-black">
                  If you're a small business or a startup, this plan is designed
                  to cater to your needs. It offers a balance of essential
                  features.
                </p>
              </div>
              <div className="p-8 mt-4 shadow-2xl lg:shadow-black rounded-xl bg-gray-800 backdrop-blur-xl border-white/5 ring-1 ring-white/10">
                <ul
                  className="flex flex-col max-sm:text-xs text-sm text-gray-400 gap-y-3"
                  role="list"
                >
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Unlimited number of users</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Unlimited storage</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Advanced support</span>
                  </li>
                </ul>
                <p className="mt-6 font-mono font-bold tracking-tighter">
                  <span className="text-4xl text-white lg:text-6xl"> $15</span>
                  <span className="text-base font-medium text-gray-500">
                    {" "}
                    /mo
                  </span>
                </p>
                <div className="flex mt-6 lg:mt-12">
                  <a
                    className="rounded-lg px-4 py-2 text-sm transition-all flex items-center justify-center text-white bg-gradient-to-b from-white/[.105] to-white/[.15] hover:to-white/[.25] h-10 ring-1 ring-inset ring-white/10 w-full"
                    href="#_"
                    aria-describedby="#_"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="flex items-center gap-3 text-black">
                  {/* <div className="text-5xl">✿</div> */}
                  <p className="font-mono text-lg font-medium">
                    GOLDEN UNICORN
                  </p>
                </div>
                <p className="mt-6 text-xs font-light text-black">
                  Tailored for medium-sized businesses, this plan offers
                  advanced tools and features to support your growing demands.
                </p>
              </div>
              <div className="p-8 mt-4 shadow-2xl lg:shadow-black rounded-xl bg-gray-900 backdrop-blur-xl border-white/5 ring-1 ring-white/10">
                <ul
                  className="flex flex-col max-sm:text-xs text-sm text-gray-400 gap-y-3"
                  role="list"
                >
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Unlimited number of users</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Unlimited storage</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        stroke-width="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Advanced support</span>
                  </li>
                </ul>
                <p className="mt-6 font-mono font-bold tracking-tighter">
                  <span className="text-4xl text-white lg:text-6xl"> $35</span>
                  <span className="text-base font-medium text-gray-500">
                    {" "}
                    /mo
                  </span>
                </p>
                <div className="flex mt-6 lg:mt-12">
                  <a
                    className="rounded-lg px-4 py-2 text-sm transition-all flex items-center justify-center text-white bg-gradient-to-b from-white/[.105] to-white/[.15] hover:to-white/[.25] h-10 ring-1 ring-inset ring-white/10 w-full"
                    href="#_"
                    aria-describedby="#_"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute w-full h-28 bg-black -mt-24  max-w-[1500px]  mx-auto"></div> */}
      </section>
      </div>
      
    </>
  );
}

export default SubscriptionPage;
