import "./App.css";
import { useEffect, useState } from "react";
import Background from "./images/bg-header-desktop.svg";
import DataTab from "./Components/DataTab";
import { dataArray } from "./data";
import Close from "./images/icon-remove.svg";

function App() {
  const [filterTags, setFilterTags] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataArray);
  }, []);

  const filterByRole = (tag) => {
    const filteredDataByRole = data.filter((job) => job.role.includes(tag));
    if (filterTags.length > 0 && tag !== "") {
      setData(filteredDataByRole);
    }
  };
  const filterByLanguage = (tag) => {
    const filteredDataByLanguage = data.filter((job) =>
      job.languages.includes(tag)
    );
    if (filterTags.length > 0 && tag !== "") {
      setData(filteredDataByLanguage);
    }
  };
  const filterByLevel = (tag) => {
    const filteredDataByLevel = data.filter((job) => job.level.includes(tag));
    if (filterTags.length > 0 && tag !== "") {
      setData(filteredDataByLevel);
    }
  };
  const filterByTools = (tag) => {
    const filteredDataByTools = data.filter((job) => job.tools.includes(tag));
    if (filterTags.length > 0 && tag !== "") {
      setData(filteredDataByTools);
    }
  };

  const filterFunction = (filterBy, tag) => {
    console.log("filter by " + filterBy + "with " + tag);
    if (filterBy === "none") {
      setData(dataArray);
    } else if (filterBy === "role" && tag !== "") {
      filterByRole(tag);
    } else if (filterBy === "language" && tag !== "") {
      filterByLanguage(tag);
    } else if (filterBy === "level" && tag !== "") {
      filterByLevel(tag);
    } else if (filterBy === "tools" && tag !== "") {
      filterByTools(tag);
    }
  };

  useEffect(() => {
    if (filterTags.length === 0) {
      filterFunction("none");
    }
  }, [filterTags]);

  return (
    <div className="App">
      <header className="topBar">
        <img src={Background} alt="Background" />
      </header>
      <main>
        {filterTags.length > 0 ? (
          <FilterBar filterTags={filterTags} setFilterTags={setFilterTags} />
        ) : null}
        {data.map((data) => {
          return (
            <DataTab
              key={data.id}
              data={data}
              setFilterTags={setFilterTags}
              filterTags={filterTags}
              filterFunction={filterFunction}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;

const FilterBar = ({ filterTags, setFilterTags }) => {
  const removeFromSearch = (tag) => {
    const removingIndex = filterTags.indexOf(tag);
    const copyOfFilterTags = [...filterTags];
    copyOfFilterTags.splice(removingIndex, 1);
    setFilterTags(copyOfFilterTags);
  };
  return (
    <div className="filter-bar flex">
      {filterTags.map((tag) => (
        <div className="flex">
          <p className="filter-tag">{tag}</p>
          <div
            className="close-icon-container"
            onClick={() => {
              removeFromSearch(tag);
            }}
          >
            <img src={Close} alt="Remove the tag" />
          </div>
        </div>
      ))}
      <p
        className="clear"
        onClick={() => {
          setFilterTags([]);
        }}
      >
        Clear
      </p>
    </div>
  );
};
