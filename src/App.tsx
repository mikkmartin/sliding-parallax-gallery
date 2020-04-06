import * as React from "react";
import { useSize } from "../useSize";
import styled from "styled-components";
import { motion } from "framer-motion";

const items = [
  "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1513171920216-2640b288471b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0",
  "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNTI5Nn0"
];
export default function App() {
  const [parentSize, ref] = useSize();

  return (
    <div
      style={{
        background: "skyblue",
        width: "100vw",
        overflow: "hidden",
        padding: "10vh 0"
      }}
    >
      <Container ref={ref}>
        {items.map((url, i) => (
          <Item key={i} parentSize={parentSize} src={url} nth={i} />
        ))}
      </Container>
    </div>
  );
}

const Container = styled(motion.div)`
  background: yellow;
  width: 100%;
  display: flex;
  perspective: 300px;
`;

function Item({
  parentSize: parent,
  nth,
  ...rest
}: {
  parentSize: DOMRect;
  nth: number;
}) {
  const [item, ref] = useSize();
  console.log("recalculating()");
  const itemsWidth = (items.length - 1) * item.spaceWidth;
  const marginGap = item.width - item.spaceWidth;
  const totalWidth = Math.max(parent.width, itemsWidth) - marginGap;
  const left = -item.left + parent.left - item.width;
  const right = totalWidth - item.left + parent.left;
  const pos =
    ((-item.width - item.left + parent.left) / (totalWidth + item.width)) * -1;
  const odd = nth % 2;
  const zPos = Math.random() * 20 + Math.random() * odd * 20;
  return (
    <Img
      //style={{ z: zPos, zIndex: odd, y: odd * -20 }}
      animate={{
        x: [0, left, right, 0]
      }}
      transition={{
        loop: Infinity,
        duration: items.length,
        times: [0, pos, pos, 1]
      }}
      ref={ref}
      {...rest}
    />
  );
}

const Img = styled(motion.img)`
  flex-shrink: 0;
  box-sizing: border-box;
  width: 10rem;
  min-width: 15%;
  height: auto;
  margin-left: -2rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;
