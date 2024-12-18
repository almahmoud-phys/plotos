import { Tab, TabList, TabPanel, TabPanels, Tabs, Rows, Button } from "@canva/app-ui-kit";
import React, { useRef } from "react";
import { DataTab } from "../DataTab/DataTab";
import { ChartTab } from "../ChartTab/ChartTab";
import { AxesTab } from "../AxesTab/AxesTab";
import { Chart } from "../ChartTab/Chart";
import { useAppContext } from "../../context/AppContext";
import { addElementAtPoint, AltText } from "@canva/design";

export const ChartCreator: React.FC = () => {
  const { traces } = useAppContext();
  const chartRef = useRef<HTMLDivElement>(null);

  const handleInsertChart = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = chartRef.current.querySelector('canvas');
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }
      
      const dataUrl = canvas.toDataURL('image/png');
      
      await addElementAtPoint({
        type: "image",
        dataUrl: dataUrl,
        altText: { text: "Generated chart" } as AltText
      });
    } catch (error) {
      console.error('Error inserting chart:', error);
    }
  };
  
  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      maxWidth: '100%', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        flex: 1, 
        overflow: 'hidden', 
        width: '100%' 
      }}>
        <Rows spacing="2u">
          <div ref={chartRef} style={{ 
            width: '100%', 
            height: '250px',
            minHeight: '250px',
            maxHeight: '250px', 
            backgroundColor: '#fff', 
            border: '1px solid #e6e6e6', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <Chart traces={traces} />
          </div>
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <Tabs>
              <Rows spacing="1u">
                <TabList>
                  <Tab id="data">Data</Tab>
                  <Tab id="charts">Charts</Tab>
                  <Tab id="axes">Axes</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel id="data">
                    <DataTab />
                  </TabPanel>
                  <TabPanel id="charts">
                    <ChartTab />
                  </TabPanel>
                  <TabPanel id="axes">
                    <AxesTab />
                  </TabPanel>
                </TabPanels>
              </Rows>
            </Tabs>
          </div>
        </Rows>
      </div>
      <div style={{ 
        padding: '16px', 
        borderTop: '1px solid #e6e6e6', 
        backgroundColor: 'white',
        width: '100%',
        boxSizing: 'border-box' 
      }}>
        <Button
          variant="primary"
          onClick={handleInsertChart}
          stretch
        >
          Insert Chart into Design
        </Button>
      </div>
    </div>
  );
};
