import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { ThemeProvider } from "./contexts/theme";

const Posts = React.lazy(() => import("./components/Posts"));
const Post = React.lazy(() => import("./components/Post"));
const User = React.lazy(() => import("./components/User"));

export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    //
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <NavBar toggleTheme={toggleTheme} />

            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Posts type="topstories" />}
                />
                <Route
                  exact
                  path="/new"
                  render={() => <Posts type="newstories" />}
                />
                <Route
                  path="/post"
                  render={(routeProps) => <Post {...routeProps} />}
                />
                <Route
                  path="/user"
                  render={(routeProps) => <User {...routeProps} />}
                />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

/* 
export default class App extends Component {
  state = {
    theme: "dark",
    toggleTheme: () =>
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      })),
  };

  render() {
    return (
      //
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <NavBar />

              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Posts type="topstories" />}
                  />
                  <Route
                    exact
                    path="/new"
                    render={() => <Posts type="newstories" />}
                  />
                  <Route
                    path="/post"
                    render={(routeProps) => <Post {...routeProps} />}
                  />
                  <Route
                    path="/user"
                    render={(routeProps) => <User {...routeProps} />}
                  />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
} 
*/
