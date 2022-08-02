import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import img from "../img/img.png";
import logo from "../img/logo.png";


function Aboutus() {
  return (
    <>
      <Box mt={-3.7} ml={-13.5}>
        <CardMedia component="img" image={img} height={200} />
        <Typography variant="h3" color="white" marginTop={-15} marginLeft={16}>
          تسوق من راحة بيتك بأفضل الأسعار
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
        mt={10}
      >
        <Box>
          <Typography variant="h3">من نحن؟</Typography>
          <Typography variant="h5" marginTop={4} color="secondary">
            خير وبركة هي مبادرة وقفية
          </Typography>

          <Typography variant="h6" marginTop={2}>
            يهدف القيّمون عليها إلى تخفيف الأعباء الإقتصاديّة عن كاهل أفراد
            المجتمع، عبر تأمين أهم الموادّ الغذائيّة والإستهلاكيّة بأوفر الأسعار
            وتوصيلها إلى منازلهم. كما تحقّق هذه المبادرة مفهوم التكافل
            الإجتماعي، عبر إعطاء الفرصة لمن يريد من الأفراد الميسورين التبرّع
            بمبالغ إضافيّة لكلفة السلع أو تقديم المساعدات العينيّة لنقوم
            بتسليمها للعائلات العاجزة عن شرائها، و ذلك بعد دراسة وضعها الاجتماعي
          </Typography>
          <Typography variant="h6" marginTop={3}>

            <ul>
              <li> لإفادة أكبر عدد ممكن نأسف عن إلغاء أي طلبية تحتوي مواد مدعومة لنفس
                العائلة</li>
              <li>لا نستقبل محلات تجارية</li>
              <li>الطلبيات مخصصة للمنازل فقط</li>
              <li>الحد الأدنى للطلبية هو 50.000 ل.ل</li>
            </ul>
          </Typography>
        </Box>
        <Box
          sx={{
            width: 1200,
            marginTop: 5,
          }}
        >
          <CardMedia component="img" image={logo} />
        </Box>
      </Box>
    </>
  );
}

export default Aboutus;
