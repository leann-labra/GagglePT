import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Grommet,
  grommet,
  Header,
  Heading,
  Page, 
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Text,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { Moon, Sun } from "grommet-icons";

const theme = deepMerge(grommet, {
  global: {
    colors: {
      // brand is an example - can be changed
      brand: '#228BE6', 
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
});

const AppBar = (props) => (
  <Header
  background="brand"
  pad={{ left: "medium", right: "small", vertical: "small" }}
  elevation="medium"
  {...props}
  />
)

//Template
const CardTemplate = ({ title }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Card>
      <CardHeader pad="medium">
          <Heading level={2} margin="none">
            {title}
          </Heading>
      </CardHeader>
      <CardBody pad="medium">
        <Paragraph maxLines={size === "small" ? 3 : undefined}>
          pee pee poo poo
        </Paragraph>
      </CardBody>
      <CardFooter pad="medium" background="background-contrast">
        Footer text
      </CardFooter>
    </Card>
  );
};

function App() {
  const [dark, setDark] = useState(false);
  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <Text size="large">GagglePT</Text>
          <Button
          a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          icon={dark ? <Moon /> : <Sun />}
          onCLick={() => setDark(!dark)}
          tip={{
            content: (
              <Box
                pad="small"
                round="small"
                background={dark ? "dark-1" : "light-3"}
                >
                  {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Box>
            ),
            plain: true,
          }}
          />
        </AppBar>
        <PageContent>
          <PageHeader title="Welcome to GagglePT!" />
          <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
            <CardTemplate title={"Card 1"} />
            <CardTemplate title={"Card 2"} />
            <CardTemplate title={"Card 3"} />
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
