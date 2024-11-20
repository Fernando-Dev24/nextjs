import Image from "next/image"
import { IoBrowsers, IoCalculator, IoFootball, IoLogoReact } from "react-icons/io5"
import { SidebarMenuItem } from './SidebarMenuItem';

const menuItems = [
   {
      path: '/dashboard/main',
      icon: <IoBrowsers size={25} className="mr-2" />,
      title: 'Dashboard',
      subTitle: 'Manage your knowledge',
   },
   {
      path: '/dashboard/counter',
      icon: <IoCalculator size={25} className="mr-2" />,
      title: 'Counter',
      subTitle: 'Counter client side',
   },
   {
      path: '/dashboard/pokemons',
      icon: <IoFootball size={25} className="mr-2" />,
      title: 'Pokemons',
      subTitle: 'Generacion estatica',
   }
]

export const Sidebar = () => {
   return (
      <div
         id="menu"
         className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-auto"
         style={{
            width: '400px'
         }}>

         <div id="logo" className="my-4 px-6">
            <h1 className="flex flex-row items-center text-lg md:text-2xl font-bold text-white">
               <IoLogoReact className="mr-2" />
               <span>Dash</span>
               <span className="text-blue-500">8</span>
               .</h1>
            <p className="text-slate-500 text-sm">Manage what you just have learnt about NextJS +13</p>
         </div>

         <div id="profile" className="px-6 py-10">
            <p className="text-slate-500">¡Bienvenido!</p>
            <a href="#" className="inline-flex space-x-2 items-center">
               <span>
                  <Image
                     src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                     alt="Foto de perfil"
                     width={50}
                     height={50}
                     className="rounded-full w-8 h-8"
                  />
               </span>
               <span className="text-sm md:text-base font-bold">
                  Fernando Ortiz
               </span>
            </a>
         </div>
         <div id="nav" className="w-full px-6">

            {menuItems.map((item) => (
               <SidebarMenuItem key={item.path} {...item} />
            ))}

            {/* <a href="#" className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
               <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
               </div>
               <div className="flex flex-col">
                  <span className="text-lg text-slate-300 font-bold leading-5">Counter</span>
                  <span className="text-sm text-slate-500 hidden md:block">Estado local</span>
               </div>
            </a> */}
         </div>
      </div>
   )
}