import React from "react";
import { numberWithCommas } from "../../utils/numberFormat";

const Products = ({menus,enterCharts}) => {
    return (
        <div className="lg:w-[55%] px-5 lg:px-0  ">
            <h4 className="py-2 lg:ps-2">Daftar Products</h4>
            <hr />
            <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  gap-4 mt-5">
                {menus && menus.map((menu) => (
                    <div key={menu.id} 
                        className="border-2 pb-2 shadow-xl cursor-pointer"
                        onClick={() => enterCharts(menu)}
                    >
                        <img src={`assets/images/`+menu.category.nama.toLowerCase()+"/"+menu.gambar} alt={menu.gambar} />
                        <h2 className="px-4">{menu.nama} <strong>({menu.kode})</strong></h2>    
                        <h2 className="px-4">Rp.{numberWithCommas(menu.harga)}</h2>    
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Products