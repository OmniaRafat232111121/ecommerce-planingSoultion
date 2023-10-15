'use client'
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';


const FacebookMsg = () => {
      return (
      <FacebookProvider appId="1939276963126118" chatSupport>
        <CustomChat pageId="104166139457575" minimized={true}/>
      </FacebookProvider>    
 
  )
}

export default FacebookMsg