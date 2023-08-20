import React, { Component } from "react";
import Categories from "../../components/penjualan/listCategories";
import Products from "../../components/penjualan/listProducts";
import Hasil from "../../components/penjualan/Hasil";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { MainNavigasi } from "../../components/MainNavigasi";
import swal from "sweetalert";



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hoverItem: false,
          menus:[],
          carts:[],
          choseCategory:"Makanan"
        //   setItemHover:false
        };
    }
    setItemHover = (value) => {
        this.setState({
          hoverItem: value,
        });
    };
    // unutk API
    componentDidMount() {
        axios
            .get(API_URL+"products?category.nama="+this.state.choseCategory) //products?category.nama="+this.state.choseCategory == berdasarkan category
            .then(res => {
                console.log("response menus : ", res);
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error=> {
                console.log("eror ya",error);
            })
       this.getListKeranjang();
    }
    // update setiap kali menu baru diklik
    // componentDidUpdate(prevState) {
    //     if(this.state.carts !== prevState.carts) {
    //         axios
    //         .get(API_URL+"keranjangs") 
    //         .then(res => {
    //             console.log("response menus : ", res);
    //             const carts = res.data;
    //             this.setState({ carts });
    //         })
    //         .catch(error=> {
    //             console.log("eror ya",error);
    //         })
    //     }
    // }

    getListKeranjang= () => {
        axios
        .get(API_URL+"keranjangs") 
        .then(res => {
            console.log("response menus : ", res);
            const carts = res.data;
            this.setState({ carts });
        })
        .catch(error=> {
            console.log("eror ya",error);
        })
    }
    changeCategory = (value) => {
        this.setState({
            choseCategory:value,
            menus:[]
        })
        axios
            .get(API_URL+"products?category.nama="+value)
            .then(res => {
                console.log("response menus : ", res);
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error=> {
                console.log("eror ya",error);
            })
    }

    enterCharts = (value) => {
        axios
            .get(API_URL+"keranjangs?product.id=" + value.id)
            .then(res => {
                if(res.data.length === 0) {
                    const keranjang ={
                        jumlah:1,
                        total_harga: value.harga,
                        product:value
                    }
                    axios
                    .post(API_URL+"keranjangs",keranjang)
                    .then(res => {
                        this.getListKeranjang();
                        swal({
                            title: "Good job!",
                            text: "You clicked the button!" + keranjang.product.nama,
                            icon: "success",
                            button: false,
                            timer:1000
                          });
                    })
                    .catch(error=> {
                        console.log("eror ya",error);
                    })
                } else { //kalau ada
                    const keranjang ={
                        jumlah:res.data[0].jumlah+1,
                        total_harga:res.data[0].total_harga+value.harga,
                        product:value
                    }
                    axios
                    .put(API_URL+"keranjangs/"+res.data[0].id,keranjang)
                    .then(res => {
                        swal({
                            title: "Good job!",
                            text: "You clicked the button!" + keranjang.product.nama,
                            icon: "success",
                            button: false,
                            timer:1000
                          });
                    })
                    .catch(error=> {
                        console.log("eror ya",error);
                    })
                }
            })
            .catch(error=> {
                console.log("eror ya",error);
            })
    }
    
  render() {
    const{menus, choseCategory, carts} =this.state
    // console.log(this.state.menus);
    return (
            <div className="lg:flex w-full">
                <Categories 
                    changeCategory={this.changeCategory} 
                    choseCategory={choseCategory}
                />
                <Products
                    menus={menus}
                    enterCharts={this.enterCharts}
                />
                <Hasil carts={carts} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </div>
        
    )
  }
}
