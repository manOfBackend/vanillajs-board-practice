export const asyncHandler = {
  setLoading(key) {
    this.setState({
      [key]: {
        loading: true,
        data: null,
        error: null,
      },
    });
  },

  setError(key, error) {
    this.setState({
      [key]: {
        loading: false,
        data: null,
        error,
      },
    });
  },

  setData(key, data) {
    this.setState({
      [key]: {
        loading: false,
        data,
        error: null,
      },
    });
  },
};

export const asyncInitState = {
  loading: false,
  data: [
    {
      id: 0,
      content:
        '같은 피부가 그들은 어디 곳으로 고행을 모래뿐일 있으며, 꽃 낙원을 피는 앞이 만물은 끝에',
      category: '영화',
      created_at: '2021-07-12T13:00:00.000Z',
    },
    {
      id: 1,
      content:
        '기쁘며, 보배를 보이는 얼마나 인류의 이상의 너의 청춘 그들은 봄바람을 넣는 것이다. 커다란 스며들어',
      category: '산업',
      created_at: '2021-06-24T13:00:00.000Z',
    },
  ],
  error: null,
};
