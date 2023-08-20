import React, { Component } from 'react'
import axios  from 'axios'
import { API_URL } from '../../utils/constant'
import {FaUtensils, FaCoffee, FaCheese} from "react-icons/fa"

const Icon =({nama}) =>{
    if(nama === "Makanan") return <FaUtensils/>
    if(nama === "Minuman") return <FaCoffee/>
    if(nama === "Cemilan") return <FaCheese/>

    return <FaUtensils/>
};

export default class Categories extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         categories:[],
      }
    }
    // untuk API
    componentDidMount() {
        axios
            .get(API_URL+"categories")
            .then(res => {
                console.log("response categories : ", res);
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error=> {
                console.log("eror ya",error);
            })
    }
    
  render() {
    // console.log("Categories"+this.state.categories);
    const {categories} = this.state
    const {changeCategory,choseCategory} = this.props

    return (
        <div className="lg:w-[20%] px-5 lg:px-0">
            <h4 className="py-2 lg:ps-5">Daftar Kategori</h4>
            <hr />
            <div className='border mt-5 lg:w-[89%] mx-auto'>
                {categories && categories.map((categori)=>
                    <div
                        key={categori.id}
                        className={`border ${choseCategory === categori.nama && "categori-aktif"}`}
                        onClick={() => changeCategory(categori.nama)}
                    >
                        <button className='py-1 px-2 w-full text-start flex items-center gap-3'><Icon nama={categori.nama}/>{categori.nama}</button> 
                    </div>
                )}
            </div>
        </div>
    )
  }
}


