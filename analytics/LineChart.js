
import { StyleSheet, View } from "react-native";
import {
  VictoryArea, VictoryChart, VictoryLabel, createContainer, VictoryTooltip,
  VictoryScatter,
  VictoryAxis
} from "victory-native";


export default function LineChart(props) {

  console.log(`In chart ${JSON.stringify(props.data)}`);
  let data = props.data.data;
  let topSpending = props.data.maxExpense;
  const VictoryBrushVoronoiContainer = createContainer("brush", "voronoi");
  let selectedItemIndex = data.selectedItem[0].itemIndex;
  let startX = (selectedItemIndex - 2) >= 0 ? selectedItemIndex - 2 : 0;
  let endX = (selectedItemIndex + 2) >= 5 ? selectedItemIndex + 2 : 5;

  console.log(data.selectedItem[0].itemIndex);
  console.log(endX);
  return (

    <View style={{ marginTop: 40, position: "relative" }}>


      <VictoryChart
        domain={{ x: [startX, endX], y: [0, topSpending * (1.10)] }}
        containerComponent={

          <VictoryBrushVoronoiContainer
            brushDimension="x"
            brushDomain={getBrushDomain(data.selectedItem)}
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


          data={data.groups} x="item" y="expenses"
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
          x="item" y="expenses"
          data={data.selectedItem}

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

  let itemIndex = parseInt(selectedItem[0].itemIndex);

  return { x: [itemIndex, itemIndex + 0.01], y: [0, selectedItem[0].expenses] }
}