# Global-News-App project log

- 주제 : 리액트 라우터를 이용해 뉴스앱 만들어보기
- React, React-Router, Redux, React-Redux, Redux-Thunk, Axios, newsapi(https://newsapi.org/) 사용

## 2018 / 01 / 29

### App Overview

- input에 도시 이름을 입력한뒤 search 버튼을 누르면 axios를 이용해 https://openweathermap.org/api에 요청을 보내 각 도시별 날씨 정보 가져온다.
- api에서 가져온 정보들은 리덕스를 이용해 액션 -> 리듀서의 순서로 진행되며 리듀서에서 배열의 형태인 state에 저장되어진다.
- state에 저장이된 정보들은 mapStateToProps에서 필요한 정보들만을 추출해내어 HandleCitySearch 컴포넌트의 자식컴포넌트들인 HandleCityResult와 HandleGoogleMap 컴포넌트에 각각 보내지게 된다.
- HandleCityResult 컴포넌트에는 전반적인 도시 날씨의 정보를 props로 받으며 HandleGoogleMap 컴포넌트는 검색한 도시의 위도와 경도값을 props로 받는다.
- 도시 이름을 검색하게되면 구글맵 라이브러리에 위도와 경도값이 새로 입력이 되어 지도가 해당 도시로 이동한다.
- 또한 구글맵 하단에 도시의 이름과 현재날씨, 온도, 습도 정보가 나오게된다.

- 각 나라별 텍스트 버튼을 클릭하게 되면 axios를 이용해 https://newsapi.org/v2/top-headlines으로 요청이 보내진다.
- api에서 가져온 정보들은 리덕스에 입력된 변수에 따라 미국, 한국, 일본의 헤드라인 탑 20의 정보를 가져온다.
- 각 나라별 컴포넌트인 `HandleUS`, `HandleKR`, `HandleJP`에서 componentDidMount안에 있는 action creator에 키워드를 넣어주며 그 키워드에 맞춰 필요한 정보드를 가져온다.
- 필요한 정보를 가져왔으면 헤드라인들이 리스트가 되어있는 페이지로 넘어가게되고 리스트중 하나를 클릭하게 되면 기사 내용을 확인할 수 있다.
- `HandleNewsDetail`에서는 id값으로는 해당 기사의 타이틀을 할당했고 componentDidMount를 이용해 스토어에서 가져온 정보와 id값을 비교해 기사내용을 렌더링 하게 만들어주었다.
- 각 나라별 컴포넌트의 기사내용은 똑같은 형식으로 작성되기 때문에 `HandleNewsDetail`컴포넌트가 부모컴포넌트를 받아 렌더링하게 만들어주었지만 아쉬웠던점은 각 나라별 컴포넌트도 같은 형식이며 분명 하나의 컴포넌트로 작성이 가능하지만 어떻게 하나의 컴포넌트가 각 나라별 키워드를 받으며 동시에 라우터를 이용해 받은 키워드를 이용해 주소를 표기해줄지 아이디어가 떠오르지 않았다는 점이다.

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
- 그리고 필요한 데이터가 배열이나 객체안에 깊숙히 있을경우에는 `mapStateToProps`를 이용해서 코드의 길이를 줄이면 덜 복잡해지며 버그확률이 줄어든다.
- 그리고 reducer에서는 배열보다 객체를 한번 사용해보자.
