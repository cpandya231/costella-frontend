
import { StyleSheet, View } from "react-native";
import {
  VictoryArea, VictoryChart, VictoryLabel, createContainer, VictoryTooltip,
  VictoryScatter,
  VictoryAxis
} from "victory-native";


export default function LineChart(props) {

  let data = props.data.data;
  let topSpending = props.data.maxExpense;
  const VictoryBrushVoronoiContainer = createContainer("brush", "voronoi");
  let selectedItemIndex = data.selectedItem[0].itemIndex;
  let startX = (selectedItemIndex - 3) > 0 ? selectedItemIndex - 3 : 1;
  let endX = selectedItemIndex


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
            labels={({ datum }) => {
              return datum.continuous != null ? `\u20B9 ${datum.expenses}` : null;
            }}

            labelComponent={
              <VictoryTooltip dy={-17} constrainToVisibleArea />
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
          style={{
            data: {
              fill: "#11999E", stroke: "rgba(196,196,196,0.4)",
              strokeWidth: 10
            }
          }}
          size={8}
          x="item" y="expenses"
          data={data.selectedItem}

          labels={({ datum }) => ` \u20B9 ${datum.expenses}`} />







        <VictoryAxis crossAxis

          style={{
            axis: { stroke: "transparent" },
            tickLabels: { marginTop: 8, fontFamily: "Noto Sans Bold", fill: "#C4C4C4" }

          }}
          fixLabelOverlap={true}
        />
      </VictoryChart>
    </View >
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