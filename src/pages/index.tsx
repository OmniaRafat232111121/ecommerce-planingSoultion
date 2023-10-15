import Banner from '@/components/Banner'
import Products from '@/components/Products'
import { Inter } from 'next/font/google'
import { ProductProps } from '../../type'
import Head from 'next/head';
import FacebookMsg from '@/components/FacebookMsg';

const inter = Inter({ subsets: ['latin'] })
interface Props {
  productData: ProductProps;

}
export default function Home({ productData }: Props) {
  console.log(productData)
  return (
    <main>
      <Head>
        <title>planing soultion</title>
        <meta name="description" content="Your page description" />
      </Head>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
      <FacebookMsg/>
    </main>
  )
}


// SSR for data fetching
export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await res.json();
  return {
    props:
    {
      productData
    }
  };
};
