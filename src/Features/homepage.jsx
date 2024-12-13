import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

const Homepage = () => {

    const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('AAPL');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=TJEH9S8WK527RRLN`
        );
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <>
     <div>


<section className="bg-[#2DD4BF] text-white text-center py-20">
  <h1 className="text-4xl font-bold">Prediksi Saham Akurat dengan AI</h1>
  <p className="mt-4 text-lg">Tingkatkan keputusan investasi Anda dengan prediksi saham berbasis analitik canggih.</p>
  
  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
    <Link to="/predictions" className="inline-block bg-white text-[#2DD4BF] py-2 px-6 rounded-full">
      Lihat Prediksi Saham
    </Link>
    <Link to="/modules" className="inline-block bg-white text-[#2DD4BF] py-2 px-6 rounded-full">
      Lihat Modul Edukasi
    </Link>
  </div>
</section>





      
<section className="py-20 bg-gray-100">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">Fitur Utama</h2>
    <div className="grid md:grid-cols-3 gap-12">
      <div className="border border-gray-300 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Prediksi Saham Real-time</h3>
        <p>Gunakan teknologi AI untuk mendapatkan prediksi saham secara langsung berdasarkan analisis pasar.</p>
      </div>
      <div className="border border-gray-300 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Keakuratan Prediksi</h3>
        <p>Prediksi kami telah terbukti akurat berdasarkan data historis pasar saham.</p>
      </div>
      <div className="border border-gray-300 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Modul Pendidikan</h3>
        <p>Pelajari lebih lanjut tentang saham dan cara berinvestasi dengan modul pendidikan kami yang mudah diakses.</p>
      </div>
    </div>
  </div>
</section>
     
    </div>
  
    </>
   
  );
}

export default Homepage;
