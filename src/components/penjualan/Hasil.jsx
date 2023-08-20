import React, { Component } from "react";
import { numberWithCommas } from "../../utils/numberFormat";
import TotalBayar from "./TotalBayar";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {GrFormClose} from "react-icons/gr"
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../../utils/constant";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModals: false,
      cartDetail: null,
      jumlah: 0,
      keterangan: " ",
      totalHarga:0,
    };
  }

  handleShow = (cart) => {
    this.setState({
      showModals: true,
      cartDetail: cart,
      jumlah: cart.jumlah,
      keterangan:cart.keterangan,
      totalHarga:cart.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModals: false,
    });
  };

  handlePlus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.cartDetail.product.harga*(this.state.jumlah + 1)
    });
  };
  
  handleMinus = () => {
    if (this.state.jumlah > 1) {  // >1 artinya minus tidak boleh kurang dari 1
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.cartDetail.product.harga*(this.state.jumlah - 1)
      });
    }
  };
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose()// ketika di submit auto close
  
    // console.log("Hai", this.state.keterangan);
    const data ={
      jumlah:this.state.jumlah,
      total_harga: this.state.totalHarga,
      product:this.state.cartDetail.product,
      keterangan:this.state.keterangan
  }
  axios
  .put(API_URL+"keranjangs/"+this.state.cartDetail.id, data)
  .then(res => {
    this.props.getListKeranjang();
      swal({
          title: "Update Pesanan",
          text: "Sukses Update Pesanan" + data.product.nama,
          icon: "success",
          button: false,
          timer:1000
        });
  })
  .catch(error=> {
      console.log("eror ya",error);
  })
  };

  handleRemovePesanan = (id) => { // pakai id unutk menghapus pesanan dengan id yang sama
    this.handleClose()// ketika di submit auto close
  
  axios
  .delete(API_URL+"keranjangs/"+id)
  .then(res => {
    this.props.getListKeranjang();
      swal({
          title: "Delete Pesanan",
          text: "Sukses Delete Pesanan" + this.state.cartDetail.product.nama,
          icon: "error",
          button: false,
          timer:1000
        });
  })
  .catch(error=> {
      console.log("eror ya",error);
  })
  };
  
  

  render() {
    const { carts } = this.props;

    return (
      // webbb
      <div className="lg:w-[25%] lg:px-0 mt-7 lg:mt-0">
        <h4 className="ps-5 lg:ps-2 py-2">Hasil</h4>
        <hr />
        {carts.length !== 0 && (
          <div className="px-5 cursor-pointer overflow-auto h-[200px] lg:h-[512px]  border mt-5 mx-5 lg:mx-3">
            {carts.map((cart) => (
              <div
                className="border-b flex py-2 items-start"
                key={cart.id}
                onClick={() => this.handleShow(cart)}
              >
                <div className="w-[11%] text-center">
                  <p className="bg-emerald-500 rounded-3xl text-white  py-1">
                    {cart.jumlah}
                  </p>
                </div>
                <div className="w-[50%] ms-5">
                  <p className="text-lg">{cart.product.nama}</p>
                  <p className="">Rp.{numberWithCommas(cart.product.harga)}</p>
                </div>
                <div className="ms-auto w-[25%]">
                  <p>Rp.{numberWithCommas(cart.total_harga)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {this.state.showModals && this.state.cartDetail && (
          <div>
            <div
              className="bg-black opacity-30 h-full z-10 w-full left-0 top-0 fixed"
              onClick={this.handleClose}
            ></div>
            <div className="bg-white z-20 lg:w-[35%] sm:w-[80%] fixed inset-0 mx-auto top-16 sm:top-28 lg:top-24 h-[75vh] sm:h-[50vh] lg:h-[65vh] py-3 px-4">
              <p className="text-xl pb-3 flex items-center gap-1">
                {this.state.cartDetail.product.nama}
                <strong>
                  (Rp.{numberWithCommas(this.state.cartDetail.product.harga)})
                </strong>
                <GrFormClose className="ms-auto cursor-pointer" onClick={this.handleClose}/>
              </p>
              <div className="bg-slate-200 h-[1px] w-full "></div>
              <form action="" className="pt-3 text-base bg-white w-full" onSubmit={this.handleSubmit}>
                <label htmlFor="">Total Harga : </label>
                <p>
                  <strong>
                    Rp.{numberWithCommas(this.state.totalHarga)}
                  </strong>
                </p>
                <div className="py-2">
                <p>Jumlah : </p>
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    type="button" 
                    onClick={this.handleMinus}
                    className="bg-blue-400 rounded-md text-white p-2 hover:bg-purple-800 hover:outline hover:outline-[3px] hover:outline-purple-400"
                  >
                    <FaMinus />
                  </button>
                  <strong>{this.state.jumlah}</strong>
                  <button
                    type="button"
                    onClick={this.handlePlus}
                    className="bg-blue-400 rounded-md text-white p-2 hover:bg-purple-800 hover:outline hover:outline-[3px] hover:outline-purple-400"  
                  >
                    <FaPlus />
                  </button>
                </div>
                </div>
                <div>
                    <label htmlFor="">Keterangan : </label>
                    <textarea 
                        name="" 
                        id="Keterangan"  
                        rows="5" 
                        className="w-full outline px-3 py-1 mt-1 rounded-lg"
                        placeholder="Contoh: Pedas, Nasi Setengah"
                        value={this.state.keterangan}
                        onChange={(event)=> this.changeHandler(event)}
                    >
                    </textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-blue-400 rounded-md text-white py-1 px-2 mt-5 hover:bg-purple-800 hover:outline hover:outline-[3px] hover:outline-purple-400"  
                >
                  simpan
                </button>
              </form>
              <div className="bg-slate-200 h-[1px] w-full mt-4"></div>
              <button 
                onClick={()=> this.handleRemovePesanan(this.state.cartDetail.id)} 
                className="flex items-center ms-auto bg-red-500 rounded-md text-white py-1 px-2 mt-5 hover:bg-red-800 hover:outline hover:outline-[3px] hover:outline-red-400">
                  <FaTrash/>Hapus Pesanan
              </button>
            </div>
          </div>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </div>
    );
  }
}
