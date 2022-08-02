import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { AccountBox } from "@mui/system";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handelNavigation = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Container maxWidth={'lg'}
      component={"div"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-around"
        }}
      >
        <Box sx={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} >
          <Typography
            variant="h4"
            fontWeight={100}
            align={"left"}
            color="primary"
          >
            الصفحة التي تبحث عنها غير موجودة
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{ borderColor: "primary", mx: "20px" }}
          />

          <Typography
            variant="h4"
            fontWeight={100}
            align={"center"}
            color="primary"
          >
            404
          </Typography>
        </Box>


        <Button
          onClick={() => handelNavigation("")}
          variant={"contained"}
          color={"primary"}
          disableElevation
        >الصفحة الرئيسية</Button>
      </Box>
    </Container >
  );
};

export default NotFound;
