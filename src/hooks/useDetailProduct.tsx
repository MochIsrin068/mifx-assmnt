import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const mockToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzcxYTM3NjQyOGIwMDRlOWQyM2Q0NDhjMmMzZDBiZDAyMWEzYWEwNGZhMDkxNDk4YTcwZDdkNWVmM2Q0YTNhZWI0YmIzYTE5YTdiYmRhYTYiLCJpYXQiOjE2NjI0NTUzNzcsIm5iZiI6MTY2MjQ1NTM3NywiZXhwIjoxNjkzOTkxMzc3LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.Vhldf2l0ReAR9qpMqfFVIU5EsEInamLxl4WHe3KZFSsKxvA5Tod9VfmqVDcpkj8IgZOHmF1Hh9CFpu6mPsRDD96gIzMV67VQCwTMqiOFz95wzqcNLBVI6aLWBrS_Bb-us3RjSzL662yh5ijKYzpAfzLzRjZZkUxG82BbyDsnWPWOxrTkYJstipYnBTr26T--Bc0Rm25KK6QRYkyubgtLtNOPtaYoI8rpX97r3toglKIV77zgfAYxMkuS-nONvaaVxd9_qaHLejUvM60cSFxvh20XD1cvsQoQp6o1ivSebepIYtQQ-Hxiz77ripKmI3oCsX078srRRRjQkTSzdjReVNCdwCtCWX_ooSdg50W4b1J1AFKj8kwPstTUWNJrF5XCaFEUxLyb2YwMea7ffpn38X5on-LijQZEhXSWN0ndLe3us6ohHi5D0__SbkUDpXofjwd3UpIkLiHsGQqdEegSP41RNX9CsIO7cPJuzSwUct_YRkKJfkX_WAQvzZulnxPq6DJjxOd932bFfaWbRbW2qpDpOJXI5KzcN66Qe6TjerBhiziZ9D11lzqJg5GpA1X0l0rtex8C8N_hpuBYX8vVNIUn1Whwu0GjUPam4OkzNP-7GyBuSDrUjy8VrMXIxJgySqXhk4eFeOeInGO2YUEWPoDy_P5dlTvwOpOpjh1ZoYI";

export default function useDetailProduct() {
  const params = useParams();
  const id = params?.id || "";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const onPrevChangeCarousel = () => setCurrentSlide(currentSlide - 1);
  const onNextChangeCarousel = () => setCurrentSlide(currentSlide + 1);

  const updateCurrentSlide = (index: any) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const [product, setProduct] = useState({
    isLoading: false,
    items: {},
  });

  const onHandleCloseSnakbar = () => setSnackBarMessage("");

  const onAddToCart = () => {
    setSnackBarMessage("Success add to cart!");
  };

  const onBuy = () => {
    setSnackBarMessage("Success buy, check your payment status!");
  };

  const getProductDetail = async () => {
    setProduct((prevState: any) => ({ ...prevState, isLoading: true }));

    try {
      const res = await fetch("https://fe.dev.dxtr.asia/api/products", {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      });
      const productDetail = await res.json();

      setProduct({
        isLoading: false,
        items: productDetail.find((product: any) => product.id === id),
      });
    } catch (error) {
      setProduct({
        isLoading: false,
        items: {},
      });
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    currentSlide,
    onPrevChangeCarousel,
    onNextChangeCarousel,
    updateCurrentSlide,
    product,
    onBuy,
    onAddToCart,
    snackBarMessage,
    onHandleCloseSnakbar,
  };
}
