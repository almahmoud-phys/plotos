import { Rows } from "@canva/app-ui-kit";
import * as styles from "styles/components.css";
import { ChartCreator } from "./components/ChartCreator/ChartCreator";
import { AppProvider } from "./context/AppContext";

export const App = () => {
  return (
    <AppProvider>
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          <ChartCreator />
        </Rows>
      </div>
    </AppProvider>
  );
};
