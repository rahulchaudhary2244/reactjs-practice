import { useEffect } from 'react';

const withLogger = (Comp) => {
  return (props) => {
    useEffect(() => {
      console.log(`${Comp.name} rendered with ${JSON.stringify(props)}`);
    }, []);

    return <Comp {...props} />;
  };
};

const MyComp = ({ name }) => {
  return <div>{name}</div>;
};

const HocComponent = withLogger(MyComp);

export const HocExample = () => {
  return <HocComponent name="Rahul" />;
};
