
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLabel, createContainer, VictoryTooltip, VictoryScatter } from "victory-native";
export default function LineChart(props) {

  const data = [
    { week: "Jan", expenses: 100 },
    { week: "Feb", expenses: 200 },
    { week: "Mar", expenses: 50 },
    { week: "Apr", expenses: 300 },
    { week: "May", expenses: 600 },
    { week: "Jun", expenses: 200 }

  ];

  const VictoryBrushVoronoiContainer = createContainer("brush", "voronoi");

  return (
    <View style={{ marginTop: 100 }}>

      <VictoryChart

        containerComponent={

          <VictoryBrushVoronoiContainer
            brushDimension="x"
            brushDomain={{ x: [2.8, 3.2] }}
            allowDrag={false}
            allowDraw={false}
            allowResize={false}
            labels={({ datum }) => `${datum.expenses}`}
            labelComponent={
              <VictoryTooltip dy={-7} constrainToVisibleArea />
            }
          />

        }

      >

        <VictoryArea


          data={data} x="week" y="expenses"
          interpolation="natural"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{ data: { stroke: "#11999E", strokeWidth: 2, strokeLinecap: "round", fill: '#E4F9F5' } }}
          labelComponent={<VictoryLabel renderInPortal dy={-20} />}

        />

        <VictoryScatter
          style={{ data: { fill: "#11999E" } }}
          size={7}
          x="week" y="expenses"
          data={[
            { week: "Mar", expenses: 50 },

          ]}

          labels={({ datum }) => datum.expenses} />
        <VictoryAxis style={{
          axis: { stroke: "transparent" },


        }} />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    height: 150,

  },
});
