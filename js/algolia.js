(() => {
  // ns-params:@params
  var baseURL = "https://booslip.rpcx.io/";
  var params = { blogroll: [{ name: "\u9E1F\u7A9D", url: "https://colobu.com/" }], defaultcover: "https://booslip.rpcx.io/covers/bamboo.jpg", email: "smallnest@gmail.com", showcopyright: false, showmore: true, showrss: true, socialmedia: [{ name: "Github", url: "https://github.com/smallnest" }], utterances: true };

  // <stdin>
  var { appid, appkey, searchindex: indexName, enabled } = params.algolia;
  var searchClient = algoliasearch(appid, appkey);
  var { autocomplete, getAlgoliaResults } = window["@algolia/autocomplete-js"];
  function initAlgolia() {
    autocomplete({
      container: "#autocomplete",
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      attributesToSnippet: ["name:10", "description:35"]
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components, html }) {
                return html`<a class="aa-ItemWrapper" href="${baseURL}${item.uri}">
                <div class="aa-ItemContent">
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                  hit: item,
                  attribute: "name"
                })}
                    </div>
                    <div class="aa-ItemContentDescription">
                      ${components.Snippet({
                  hit: item,
                  attribute: "description"
                })}
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>`;
              }
            }
          }
        ];
      }
    });
    document.querySelector("#autocomplete input").focus();
  }
  if (enabled) {
    initAlgolia();
  }
})();
