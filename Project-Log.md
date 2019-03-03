# Global-News-App project log

- 주제 : 리액트 라우터를 이용해 뉴스앱 만들어보기
- React, React-Router, Redux, React-Redux, Redux-Thunk, Axios, newsapi(https://newsapi.org/) 사용

## 2018 / 02 / 20

### App Overview

- 구글 로그인을 실행하면 뉴스 검색 및 각 나라별 뉴스 헤드라인 데이터를 가져올 수 있다.
- 각 나라별 텍스트 버튼을 클릭하게 되면 axios를 이용해 https://newsapi.org/v2/top-headlines으로 요청이 보내진다.
- api에서 가져온 정보들은 리덕스에 입력된 변수에 따라 검색어, 미국, 한국, 일본의 헤드라인 탑 20의 정보를 가져온다.
- 각 나라별 컴포넌트인 `HandleUS`, `HandleKR`, `HandleJP`에서 componentDidMount안에 있는 action creator에 키워드를 넣어주며 그 키워드에 맞춰 필요한 정보드를 가져온다.
- 필요한 정보를 가져왔으면 헤드라인들이 리스트가 되어있는 페이지로 넘어가게되고 리스트중 하나를 클릭하게 되면 기사 내용을 확인할 수 있다.
- `HandleNewsDetail`에서는 id값으로는 해당 기사의 타이틀을 할당했고 componentDidMount를 이용해 스토어에서 가져온 정보와 id값을 비교해 기사내용을 렌더링 하게 만들어주었다.
- 로그아웃을 하게되면 `Please Sign in with Google`이라는 메세지만 화면에 렌더링이 된다.
- 각 나라별 컴포넌트의 기사내용은 똑같은 형식으로 작성되기 때문에 `HandleNewsDetail`컴포넌트가 부모컴포넌트를 받아 렌더링하게 만들어주었지만 아쉬웠던점은 각 나라별 컴포넌트도 같은 형식이며 분명 하나의 컴포넌트로 작성이 가능하지만 어떻게 하나의 컴포넌트가 각 나라별 키워드를 받으며 동시에 라우터를 이용해 받은 키워드를 이용해 주소를 표기해줄지 아이디어가 떠오르지 않았다는 점이다.
- 또한 메인화면에서 검색을 했을경우 componentDidMount안에 있는 action creator에 검색키워드가 들어가 action을 실행시키는데 문제는 만일 뉴스가 화면에 렌더링이 된 상태에서 다시 메인화면으로 돌아올 경우, 검색키워드도 다시 빈 문자열이 되며 action creator는 빈 문자열을 받기때문에 400 에러가 발생하는 문제가 있다.

### 첫번째 어려움 : 비동기 문제

- 각 컴포넌트는 총 두번 렌더링이 된다.
- 한번은 해당 컴포넌트가 실행되었을때이며 또 한번은 그 컴포넌트 안에서 `componentDidMount`가 실행되었을때 이다.
- 문제는 처음 컴포넌트가 실행이 되었을때는 action creator에서 api를 가져오기 전단계라는 것이다.
- api를 가져오지 못한상태에서 map과 같은 메소드를 사용하게되면 당연히 undefined가 나오는 에러가 발생한다.
- 그러므로 그것에 대비한 코드를 꼭 작성해야한다.
  ```js
  if (!this.props.news) {
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui active inverted dimmer">Loading...</div>
        </div>
      </div>
    );
  }
  ```
- 그리고 필요한 데이터가 배열이나 객체안에 깊숙히 있을경우에는 `mapStateToProps`를 이용해서 코드의 길이를 최대한 줄이는 것이 좋을듯 싶다.
- 그리고 reducer에서는 배열보다 객체를 한번 사용해보자.
