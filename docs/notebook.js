const baseName = "OHLC aggregation example";
const notebook = {
    "version": 1,
    "sheet": {
        "id": "e7609d50-4d28-11e9-aecb-e12689d681c1",
        "language": "javascript",
        "cells": [
            {
                "id": "3a576070-4d2e-11e9-aecb-e12689d681c1",
                "cellType": "markdown",
                "code": "# Example of OHLC aggregation\r\n\r\n## Load and preview the data",
                "lastEvaluationDate": "2019-03-23T15:57:56.248+10:00",
                "output": [],
                "errors": []
            },
            {
                "id": "e7609d51-4d28-11e9-aecb-e12689d681c1",
                "cellType": "code",
                "cellScope": "global",
                "code": "const dataForge = require(\"data-forge\");\r\nconst axios = require(\"axios\");\r\nconst response = await axios.get(\"https://pastebin.com/raw/6PGbw5MG\"); // Load data via HTTP get.\r\nlet df = new dataForge.DataFrame(response.data); // Load data into a dataframe.\r\ndisplay(df.head(5)); // Preview the data.",
                "lastEvaluationDate": "2019-03-23T15:54:28.770+10:00",
                "output": [
                    {
                        "values": [
                            {
                                "data": {
                                    "columnOrder": [
                                        "symbol",
                                        "sector",
                                        "securityType",
                                        "bidPrice",
                                        "bidSize",
                                        "askPrice",
                                        "askSize",
                                        "lastUpdated",
                                        "lastSalePrice",
                                        "lastSaleSize",
                                        "lastSaleTime",
                                        "volume",
                                        "ts"
                                    ],
                                    "columns": {
                                        "symbol": "string",
                                        "sector": "string",
                                        "securityType": "string",
                                        "bidPrice": "number",
                                        "bidSize": "number",
                                        "askPrice": "number",
                                        "askSize": "number",
                                        "lastUpdated": "number",
                                        "lastSalePrice": "number",
                                        "lastSaleSize": "number",
                                        "lastSaleTime": "number",
                                        "volume": "number",
                                        "ts": "number"
                                    },
                                    "index": {
                                        "type": "number",
                                        "values": [
                                            0,
                                            1,
                                            2,
                                            3,
                                            4
                                        ]
                                    },
                                    "values": [
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 194.37,
                                            "bidSize": 100,
                                            "askPrice": 195,
                                            "askSize": 100,
                                            "lastUpdated": 1553188361686,
                                            "lastSalePrice": 194.59,
                                            "lastSaleSize": 50,
                                            "lastSaleTime": 1553188350343,
                                            "volume": 705106,
                                            "ts": 1553188362.345773,
                                            "__index__": 0
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 175,
                                            "bidSize": 100,
                                            "askPrice": 194.81,
                                            "askSize": 100,
                                            "lastUpdated": 1553184717909,
                                            "lastSalePrice": 194.6,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": 1553184696547,
                                            "volume": 605389,
                                            "ts": 1553184718.096802,
                                            "__index__": 1
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 194.74,
                                            "bidSize": 100,
                                            "askPrice": 195.52,
                                            "askSize": 136,
                                            "lastUpdated": 1553180999484,
                                            "lastSalePrice": 194.73,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": 1553180996131,
                                            "volume": 455249,
                                            "ts": 1553180999.94565,
                                            "__index__": 2
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 176.48,
                                            "bidSize": 2000,
                                            "askPrice": 192.98,
                                            "askSize": 800,
                                            "lastUpdated": 1553177407202,
                                            "lastSalePrice": 192.96,
                                            "lastSaleSize": 7,
                                            "lastSaleTime": 1553177406620,
                                            "volume": 223647,
                                            "ts": 1553177406.926868,
                                            "__index__": 3
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 188.65,
                                            "bidSize": 200,
                                            "askPrice": 188.66,
                                            "askSize": 100,
                                            "lastUpdated": 1553111181042,
                                            "lastSalePrice": 188.65,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": 1553111180653,
                                            "volume": 694498,
                                            "ts": 1553111185.513574,
                                            "__index__": 4
                                        }
                                    ]
                                },
                                "displayType": "dataframe"
                            }
                        ]
                    }
                ],
                "errors": []
            },
            {
                "id": "47e587d0-4d2e-11e9-aecb-e12689d681c1",
                "cellType": "markdown",
                "code": "## Parse dates into JavaScript date objects",
                "lastEvaluationDate": "2019-03-23T15:57:56.248+10:00",
                "output": [],
                "errors": []
            },
            {
                "id": "2099de60-4d2e-11e9-aecb-e12689d681c1",
                "cellType": "code",
                "cellScope": "global",
                "code": "df = df.transformSeries({ lastSaleTime: d => new Date(d) }) // Convert time to JS date object.\r\n    .bringToFront(\"lastSaleTime\"); // Bring this column to the front so I can see it in the preview.\r\ndisplay(df.head(5)); // Preview again to make sure it worked.",
                "lastEvaluationDate": "2019-03-23T15:54:28.775+10:00",
                "output": [
                    {
                        "values": [
                            {
                                "data": {
                                    "columnOrder": [
                                        "lastSaleTime",
                                        "symbol",
                                        "sector",
                                        "securityType",
                                        "bidPrice",
                                        "bidSize",
                                        "askPrice",
                                        "askSize",
                                        "lastUpdated",
                                        "lastSalePrice",
                                        "lastSaleSize",
                                        "volume",
                                        "ts"
                                    ],
                                    "columns": {
                                        "lastSaleTime": "date",
                                        "symbol": "string",
                                        "sector": "string",
                                        "securityType": "string",
                                        "bidPrice": "number",
                                        "bidSize": "number",
                                        "askPrice": "number",
                                        "askSize": "number",
                                        "lastUpdated": "number",
                                        "lastSalePrice": "number",
                                        "lastSaleSize": "number",
                                        "volume": "number",
                                        "ts": "number"
                                    },
                                    "index": {
                                        "type": "number",
                                        "values": [
                                            0,
                                            1,
                                            2,
                                            3,
                                            4
                                        ]
                                    },
                                    "values": [
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 194.37,
                                            "bidSize": 100,
                                            "askPrice": 195,
                                            "askSize": 100,
                                            "lastUpdated": 1553188361686,
                                            "lastSalePrice": 194.59,
                                            "lastSaleSize": 50,
                                            "lastSaleTime": "2019-03-22T03:12:30.343+10:00",
                                            "volume": 705106,
                                            "ts": 1553188362.345773
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 175,
                                            "bidSize": 100,
                                            "askPrice": 194.81,
                                            "askSize": 100,
                                            "lastUpdated": 1553184717909,
                                            "lastSalePrice": 194.6,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": "2019-03-22T02:11:36.547+10:00",
                                            "volume": 605389,
                                            "ts": 1553184718.096802
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 194.74,
                                            "bidSize": 100,
                                            "askPrice": 195.52,
                                            "askSize": 136,
                                            "lastUpdated": 1553180999484,
                                            "lastSalePrice": 194.73,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": "2019-03-22T01:09:56.131+10:00",
                                            "volume": 455249,
                                            "ts": 1553180999.94565
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 176.48,
                                            "bidSize": 2000,
                                            "askPrice": 192.98,
                                            "askSize": 800,
                                            "lastUpdated": 1553177407202,
                                            "lastSalePrice": 192.96,
                                            "lastSaleSize": 7,
                                            "lastSaleTime": "2019-03-22T00:10:06.620+10:00",
                                            "volume": 223647,
                                            "ts": 1553177406.926868
                                        },
                                        {
                                            "symbol": "AAPL",
                                            "sector": "electronictechnology",
                                            "securityType": "cs",
                                            "bidPrice": 188.65,
                                            "bidSize": 200,
                                            "askPrice": 188.66,
                                            "askSize": 100,
                                            "lastUpdated": 1553111181042,
                                            "lastSalePrice": 188.65,
                                            "lastSaleSize": 100,
                                            "lastSaleTime": "2019-03-21T05:46:20.653+10:00",
                                            "volume": 694498,
                                            "ts": 1553111185.513574
                                        }
                                    ]
                                },
                                "displayType": "dataframe"
                            }
                        ]
                    }
                ],
                "errors": []
            },
            {
                "id": "ab3d33a0-4d2e-11e9-aecb-e12689d681c1",
                "cellType": "markdown",
                "code": "## Group by time period and aggregate\r\n\r\nUsing the moment library for date formatting.",
                "lastEvaluationDate": "2019-03-23T15:57:56.248+10:00",
                "output": [],
                "errors": []
            },
            {
                "id": "9158efb0-4d2e-11e9-aecb-e12689d681c1",
                "cellType": "code",
                "cellScope": "global",
                "code": "const moment = require(\"moment\");\r\n\r\n//\r\n// Make a key from the time that we can use to \r\n// group by day (or my minute, hour, week, month, whatever period you need).\r\n//\r\nfunction makeGroupKey(time) {\r\n    return moment(time).format(\"YYYY-MM-DD\");\r\n}\r\n\r\n\r\nconst aggregated = df.groupBy(row => makeGroupKey(row.lastSaleTime)) // Group data by lastSaleTime\r\n    .select(group => {\r\n        return {\r\n            date: moment(group.first().lastSaleTime).startOf('day').toDate(), // Extract the day.\r\n            open: group.first().bidPrice, // Opening bid.\r\n            high: group.deflate(row => row.bidPrice).max(), // Highest bid in the group.\r\n            low: group.deflate(row => row.bidPrice).min(), // Lowest bid in the group.\r\n            close: group.last().bidPrice, // Closing bid.\r\n        };\r\n    })\r\n    .inflate();\r\ndisplay(aggregated.head(5));",
                "lastEvaluationDate": "2019-03-23T15:54:28.779+10:00",
                "output": [
                    {
                        "values": [
                            {
                                "data": {
                                    "columnOrder": [
                                        "date",
                                        "open",
                                        "high",
                                        "low",
                                        "close"
                                    ],
                                    "columns": {
                                        "date": "date",
                                        "open": "number",
                                        "high": "number",
                                        "low": "number",
                                        "close": "number"
                                    },
                                    "index": {
                                        "type": "number",
                                        "values": [
                                            0,
                                            1,
                                            2
                                        ]
                                    },
                                    "values": [
                                        {
                                            "date": "2019-03-22T00:00:00.000+10:00",
                                            "open": 194.37,
                                            "high": 194.74,
                                            "low": 175,
                                            "close": 176.48
                                        },
                                        {
                                            "date": "2019-03-21T00:00:00.000+10:00",
                                            "open": 188.65,
                                            "high": 188.65,
                                            "low": 188.65,
                                            "close": 188.65
                                        },
                                        {
                                            "date": "2019-03-23T00:00:00.000+10:00",
                                            "open": 192.33,
                                            "high": 192.33,
                                            "low": 192.33,
                                            "close": 192.33
                                        }
                                    ]
                                },
                                "displayType": "dataframe"
                            }
                        ]
                    }
                ],
                "errors": []
            },
            {
                "id": "963ad330-4d2f-11e9-aecb-e12689d681c1",
                "cellType": "markdown",
                "code": "## Plot the data\r\n\r\n(There's not much data in this example to plot, but add some data and the plot will look more interesting)",
                "lastEvaluationDate": "2019-03-23T15:57:56.248+10:00",
                "output": [],
                "errors": []
            },
            {
                "id": "9ef8add0-4d2f-11e9-aecb-e12689d681c1",
                "cellType": "code",
                "cellScope": "global",
                "code": "require(\"data-forge-plot\");\r\n\r\ndisplay(aggregated.plot({}, { x: \"date\" }));",
                "lastEvaluationDate": "2019-03-23T15:54:28.784+10:00",
                "output": [
                    {
                        "values": [
                            {
                                "data": {
                                    "data": {
                                        "columnOrder": [
                                            "date",
                                            "open",
                                            "high",
                                            "low",
                                            "close",
                                            "__index__"
                                        ],
                                        "columns": {
                                            "date": "date",
                                            "open": "number",
                                            "high": "number",
                                            "low": "number",
                                            "close": "number",
                                            "__index__": "number"
                                        },
                                        "index": {
                                            "type": "number",
                                            "values": [
                                                0,
                                                1,
                                                2
                                            ]
                                        },
                                        "values": [
                                            {
                                                "date": "2019-03-21T14:00:00.000Z",
                                                "open": 194.37,
                                                "high": 194.74,
                                                "low": 175,
                                                "close": 176.48,
                                                "__index__": 0
                                            },
                                            {
                                                "date": "2019-03-20T14:00:00.000Z",
                                                "open": 188.65,
                                                "high": 188.65,
                                                "low": 188.65,
                                                "close": 188.65,
                                                "__index__": 1
                                            },
                                            {
                                                "date": "2019-03-22T14:00:00.000Z",
                                                "open": 192.33,
                                                "high": 192.33,
                                                "low": 192.33,
                                                "close": 192.33,
                                                "__index__": 2
                                            }
                                        ]
                                    },
                                    "plotConfig": {
                                        "chartType": "line",
                                        "width": 800,
                                        "height": 600,
                                        "template": "c3",
                                        "x": {
                                            "axisType": "default",
                                            "label": {}
                                        },
                                        "y": {
                                            "axisType": "default",
                                            "label": {}
                                        },
                                        "y2": {
                                            "axisType": "default",
                                            "label": {}
                                        },
                                        "legend": {
                                            "show": true
                                        }
                                    },
                                    "axisMap": {
                                        "x": {
                                            "series": "date"
                                        },
                                        "y": [
                                            {
                                                "series": "open"
                                            },
                                            {
                                                "series": "high"
                                            },
                                            {
                                                "series": "low"
                                            },
                                            {
                                                "series": "close"
                                            },
                                            {
                                                "series": "__index__"
                                            }
                                        ],
                                        "y2": []
                                    }
                                },
                                "displayType": "chart"
                            }
                        ]
                    }
                ],
                "errors": []
            }
        ]
    }
};