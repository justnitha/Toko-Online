import React, { Component } from 'react'
import { numberWithCommas } from '../../utils/numberFormat';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../../utils/constant';



export default class TotalBayar extends Component {
   
    SubmitTotalBayar= (totalBayar) => {
        const pesanan ={
            total_bayar: totalBayar,
            menus: this.props.carts
        }
        axios.post(API_URL+"pesanans",pesanan).then((res) =>{
            window.location.href = '#/sukses';
        })
    }
  render() {
    const totalBayar=this.props.carts.reduce(function (result,item) {
        return result + item.total_harga;
    },0);

    return (
      <div className='lg:fixed bottom-0 lg:px-5 lg:w-[25%] mt-5 lg:mt-0 '>
        <div className='flex items-center justify-between px-5 lg:px-0'>
            <p>Total Harga :</p>
            <p>Rp. {numberWithCommas(totalBayar)}</p> 
        </div>
        <div 
            className=' block py-1 text-white mt-2 text-xl bg-blue-400 '
        >

            <button className='w-full flex items-center justify-center gap-2' 
            onClick={() => this.SubmitTotalBayar(totalBayar)}
            
            ><FaShoppingCart/>Bayar</button>
        </div>
      </div>
    )
  }
}
