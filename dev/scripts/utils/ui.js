const UI = {
  slideAndDropListener: () => {
    $(".choices")
      .sortable({
        connectWith: ".sortable",
        scroll: false,
        revert: true,
        helper: "clone",
        containment: ".criterias-container"
      })
      .css("position", "absolute");
    $("ul, li").disableSelection();
  },
  loader: `<svg class="lds-spinner loader" width="100px"  height="100px"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#fd9341">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g></svg>`,
  transformSVG: () => {
    // Event listener to transform SVGs into inline SVGS to be able to change their colors with css fill
    $("img.svg").each(function () {
      let $img = jQuery(this);
      const imgID = $img.attr("id");
      const imgClass = $img.attr("class");
      const imgURL = $img.attr("src");

      $.get(
        imgURL,
        function (data) {
          // Get the SVG tag, ignore the rest
          let $svg = jQuery(data).find("svg");

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr("xmlns:a");

          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if (!$svg.attr("viewBox") && $svg.attr("height") && $svg.attr("width")) {
            $svg.attr("viewBox", "0 0 " + $svg.attr("height") + " " + $svg.attr("width"));
          }

          // Replace image with new SVG
          $img.replaceWith($svg);
        },
        "xml"
      );
    });
  },
};

export default UI;