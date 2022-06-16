import styled from "styled-components";
import {
  Facebook,
  Instagram,
  MailOutlined,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  background-color: #eee;
  color: #888;
  ${mobile({ flexDirection: "column" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const ContactItem = styled.div`
  display: flex;
  //   justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Payment = styled.img`
  flex: 1;
  padding: 20px;
`;
function Footer() {
  return (
    <Container>
      <Left>
        <Logo>.NGNAM</Logo>
        <Desc>
          Leading the trend of clothing - updating the latest models - the
          cheapest quotes - the best materials. Medieval uniforms. Delivery on
          time. Very standard quote. High quality material. Comfortable, Cool.
          Quality products. Gentle style.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5999">
            <a href="https://www.facebook.com/" className="itemfooter">
              <Facebook />
            </a>
          </SocialIcon>
          <SocialIcon color="E4405f">
            <Link to="/home">
              {" "}
              <a href="https://www.instagram.com/" className="itemfooter">
                <Instagram />
              </a>
            </Link>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to="/home" className="itemfooter">
              Home
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/cart" className="itemfooter">
              Cart
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/products/men" className="itemfooter">
              Man Fashion
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/products/woman" className="itemfooter">
              Woman Fashion
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/products/accessory" className="itemfooter">
              Accessories
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/account" className="itemfooter">
              My Account
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/myOrder" className="itemfooter">
              Order Tracking
            </Link>
          </ListItem>
          <ListItem>
            {" "}
            <Link to="/messenger" className="itemfooter">
              Messenger
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          82 lane 402 my Dinh street, Hanoi
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          094505709
        </ContactItem>
        <ContactItem>
          <MailOutlined style={{ marginRight: "10px" }} />{" "}
          quangnam228237@gmail.com
        </ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </Right>
    </Container>
  );
}

export default Footer;
