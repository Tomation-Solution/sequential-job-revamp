import {
  CompanyMedicalsSelectedActualItems,
  CompanyMedicalsSelectedItemsContainer,
} from "../CompanyMedicals.styles";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  title: string;
  keyValue?: string;
  data: { [key: string]: string }[];
};

function CompanyMedicalsSelectedItems({ title, data, keyValue }: Props) {
  return (
    <CompanyMedicalsSelectedItemsContainer>
      <h4>{title}</h4>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <CompanyMedicalsSelectedActualItems>
              <p>{item[keyValue || "header"]}</p>
            </CompanyMedicalsSelectedActualItems>
          </SwiperSlide>
        ))}
      </Swiper>
    </CompanyMedicalsSelectedItemsContainer>
  );
}

export default CompanyMedicalsSelectedItems;
