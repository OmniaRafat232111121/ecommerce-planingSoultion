import RootLayout from '@/components/RootLayout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { store } from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react"
import { appWithTranslation } from 'next-i18next';

function App({ Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider session={session}>
          <div className="font-bodyFont bg-gray-300">
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </div>
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}


export default appWithTranslation(App);