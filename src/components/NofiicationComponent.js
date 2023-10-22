import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
    useNotifications,
    useNovuContext
  } from '@novu/notification-center';
  import { useEffect, useRef, useState } from 'react';
  import { HeadlessService, FetchResult, ISession } from '@novu/headless';
import { getUser } from '../utils/extraFunction';
  

const NofiicationComponent = () => {
    const user  = getUser()

    const ref = useRef()
    const [init,setInit]= useState(false)
    const headlessService = new HeadlessService({
        applicationIdentifier: 'aHfJ9wiSRp8A',
        subscriberId: `${user.user_id}-sequential-jobs`,
    });
    
  
  
  
      headlessService.initializeSession({
        listener: (res) => {
  
        },
        onSuccess: (session) => {
        },
        onError: (error) => {
        },
      });
  
  
      if(!user){
        return <div></div>
      }
    return (
      <NovuProvider subscriberId={`${user.user_id}-sequential-jobs`} applicationIdentifier={'aHfJ9wiSRp8A'}>
        <CustomNotify />
        <PopoverNotificationCenter   colorScheme={'light'}>
          
          {({ unseenCount }) => <NotificationBell ref={ref} unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    );
  };   
  
  export default NofiicationComponent
  
  
  
  const CustomNotify = ()=>{
    const context = useNovuContext({
      'fetchingStrategy':{
        'fetchNotifications':true
      }
    });
    const result = useNotifications();
  
  
    const handleNotifyDispaly = ()=>{
      let localNotifyCount = window.localStorage.getItem('localNotifyCount')
      if(!localNotifyCount){
        localStorage.setItem('localNotifyCount',JSON.stringify(0))
        localNotifyCount = 0
      }else{
        localNotifyCount = JSON.parse(window.localStorage.getItem('localNotifyCount'))
      }
      if (result.unseenCount !==0){
        if(localNotifyCount!=result.unseenCount){
          localStorage.setItem('localNotifyCount',JSON.stringify(result.unseenCount ))
          const greeting = new Notification(`You have ${result.unseenCount} unread message in Sequential Job`);
        }
  
      }
    }
    useEffect(()=>{
      // if(type window !===)
      handleNotifyDispaly()
    },[result])
  
  const handleNofiy =async ()=>{
    let permission = await Notification.requestPermission();
  
  }
    useEffect(()=>{
      handleNofiy()
    },[])
  
  
   
    return(
      <div>
  
      </div>
    )
  }