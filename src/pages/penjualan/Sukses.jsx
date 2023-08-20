import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constant";
import axios from "axios";

export default class Sukses extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        console.log("response menus : ", res);
        const carts = res.data;
        carts.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("eror ya", error);
      });
  }

  render() {
    return (
      <div>
        <div className="text-center mt-6 capitalize">
          <h2 className="text-xl">Pesanan Sukses</h2>
          <p>terimakasih sudah memesan!</p>
          <Link to="/penjualan">
            <button className="bg-blue-400 px-7 py-2 mt-3 text-white">
              kembali
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
