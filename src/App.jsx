import { BrowserRouter, Routes, Route } from "react-router-dom";

import Pages from "./Pages";

const App = () => {
  const darkMode = false;
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Pages.LandingPage />} />
            {/* <Route path="login" element={<Pages.LandingPage />} /> */}
            <Route path="dev" element={<Pages.Storybook />} />
            <Route path="tools">
              <Route index element={<Pages.ToolsPage />} />
              <Route path=":toolId" element={<Pages.ToolPage />} />
            </Route>
            <Route path="users">
              <Route index element={<Pages.LandingPage />} />
              <Route path=":userId" element={<Pages.LandingPage />} />
              <Route
                path="new"
                // element={<Pages.New inputs={userInputs} title="Add New User" />}
                element={
                  <Pages.LandingPage
                    inputs={"userInputs"}
                    title="Add New User"
                  />
                }
              />
            </Route>
            <Route path="products">
              <Route index element={<Pages.LandingPage />} />
              <Route path=":productId" element={<Pages.LandingPage />} />
              <Route
                path="new"
                element={
                  // <Pages.New inputs={productInputs} title="Add New Product" />
                  <Pages.LandingPage
                    inputs={"productInputs"}
                    title="Add New Product"
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
