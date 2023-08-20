import React, { Component } from 'react'
import { BiSolidUser, BiSolidPalette, BiFolderPlus, BiFolderMinus,BiSolidCircle } from "react-icons/bi";

export class MainNavigasi extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hoverItem: false,
        //   setItemHover:false
        };
    }
    setItemHover = (value) => {
        this.setState({
          hoverItem: value,
        });
    };
  render() {
    return (
        <div className="w-[15%] h-full">
            <div className="bg-black gap-3 py-2 flex items-center justify-center">
                <div className="bg-white p-3 rounded-[2rem] text-3xl">
                    <BiSolidUser/>    
                </div>
                <div className="text-white text-lg text-center">
                    <h3>Trajuztt</h3>
                    <div className="flex items-center gap-2">
                        <BiSolidCircle className="text-green-300"/>
                        <p >Online</p>
                    </div>
                </div>
            </div>
            <div className="bg-red-500 uppercase py-3  text-center">
                <h3>main navigation</h3>
            </div>
            <div 
                className="flex" 
                onMouseLeave={() => this.setItemHover(false)}
            >
                <ul
                    className="text-xl bg-black  text-white px-2 py-3 cursor-pointer"
                    onMouseEnter={() => this.setItemHover(true)}
                >
                    <li><BiSolidPalette className="mt-4" /></li>
                    <li><BiFolderPlus className="mt-4" /></li>
                    <li><BiFolderMinus className="mt-4" /></li>
                </ul>
            {this.state.hoverItem && (
                <ul 
                    className="text-base bg-black w-full text-white  px-4 py-3"
                    onMouseLeave={() => this.setItemHover(false)}
                >
                    <li className="mt-3"><a href="">Dashboard</a></li>
                    <li className="mt-3"><a href="">Barang Masuk</a></li>
                    <li className="mt-3"><a href="">Barang Keluar</a></li>
                </ul>
            )}
            </div>
        </div>

    )
  }
}


