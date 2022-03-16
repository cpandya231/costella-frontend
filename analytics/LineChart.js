
import { StyleSheet, View } from "react-native";
import {
  VictoryArea, VictoryChart, VictoryLabel, createContainer, VictoryTooltip,
  VictoryScatter,
  VictoryAxis
} from "victory-native";


export default function LineChart(props) {




  const VictoryBrushVoronoiContainer = createContainer("brush", "voronoi");

  return (
    <View style={{ marginTop: 40, position: "relative" }}>


      <VictoryChart
        domain={{ x: [2, 5] }}
        containerComponent={

          <VictoryBrushVoronoiContainer
            brushDimension="x"
            brushDomain={getBrushDomain(props.data.selectedItem)}
            allowDrag={false}
            allowDraw={false}
            allowResize={false}
            labels={({ datum }) => `${datum.expenses}`}
            labelComponent={
              <VictoryTooltip dy={-7} constrainToVisibleArea />
            }

            brushStyle={{ stroke: "#11999E", strokeDasharray: "4, 8" }}


          />

        }

      >

        <VictoryArea


          data={props.data.weeks} x="week" y="expenses"
          interpolation="natural"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          style={{ data: { stroke: "#11999E", strokeWidth: 2, strokeLinecap: "round", fill: '#E4F9F5' } }}
          labelComponent={<VictoryLabel dy={-20} />}

        />

        <VictoryScatter
          style={{ data: { fill: "#11999E" } }}
          size={7}
          x="week" y="expenses"
          data={props.data.selectedItem}

          labels={({ datum }) => datum.expenses} />







        <VictoryAxis crossAxis

          style={{
            axis: { stroke: "transparent" },
            tickLabels: { marginTop: 8, fontFamily: "Noto Sans Bold", fill: "#C4C4C4" }

          }}
          fixLabelOverlap={true}
        />
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


function getBrushDomain(selectedItem) {

  let week = parseInt(selectedItem[0].week.split(" ")[1]) + 1;

  return { x: [week, week + 0.01], y: [0, selectedItem[0].expenses] }
}