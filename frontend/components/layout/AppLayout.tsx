import styled from 'styled-components';

const FixedWidth = styled.div`
  background-color: #ffffff;
`;

const AppLayout = (props: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <div className="flex justify-center">
      <FixedWidth className="w-[360px] sm:w-[512px]">
        {props.children}
      </FixedWidth>
    </div>
  );
};

export default AppLayout;
