import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Pane = styled.div`
  flex: 1;
  background-color: ${(props) => props.color};
`;

// renaming props becuase react components should start with capital letter
export default function SplitComponent({ left: Left, right: Right }) {
  return (
    <Container>
      <Pane color="red">
        <Left />
      </Pane>
      <Pane color="green">
        <Right />
      </Pane>
    </Container>
  );
}
