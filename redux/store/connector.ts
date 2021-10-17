import { connect, ConnectedProps } from 'react-redux';

import { AppDispatch, RootState } from '.';

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return dispatch;
};

const mapStateToProps = (state: RootState) => {
  return state;
};

// use by class components to connect to Redux instead of connect
export const connector = connect(mapStateToProps, mapDispatchToProps);

// use by class components to get the redux props
// example:
// type Props = PropsFromRedux & {
//    param1: string;
// };
export type PropsFromRedux = ConnectedProps<typeof connector>;
