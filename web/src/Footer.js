// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import * as Setting from "./Setting";
import i18next from "i18next";
import * as Conf from "./Conf"
import * as BasicBackend from "./backend/BasicBackend";
import moment from "moment";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      version: "",
      online: 0,
      highest: 0
    };
  }

  componentDidMount() {
    this.getForumVersion();
    this.getOnlineNum();
  }

  getForumVersion() {
    BasicBackend.getForumVersion()
      .then((res) => {
        this.setState({
          version: res.data,
        });
      });
  }

  getOnlineNum() {
    BasicBackend.getOnlineNum()
      .then((res) => {
        this.setState({
          online: res?.data,
          highest: res?.data2
        });
      });
  }

  render() {
    const loadingTime = Math.floor(performance.getEntries()[0].responseEnd - performance.getEntries()[0].requestStart);
    const utcTime = moment().utc(false).format("HH:mm");
    const laxTime = moment().utcOffset(-7).format("HH:mm");
    const pvgTime = moment().format("HH:mm");
    const jfkTime = moment().utcOffset(-4).format("HH:mm");

    return (
      <div id="Bottom">
        <div className="content">
          <div className="inner">
            <div className="sep10" />
            <div className="fr">
              <a href="https://www.digitalocean.com/" target="_blank">
                <div id="DigitalOcean" />
              </a>
            </div>
            {/*<div className="fr">*/}
            {/*  <a href="https://casbin.org" target="_blank">*/}
            {/*    <div className="footer-logo" />*/}
            {/*  </a>*/}
            {/*</div>*/}
            <strong>
              <a href="/about" className="dark" target="_self">{i18next.t("footer:About")}</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/faq" className="dark" target="_self">FAQ</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/api" className="dark" target="_self">API</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/mission" className="dark" target="_self">{i18next.t("footer:Mission")}</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/advertise" className="dark" target="_self">{i18next.t("footer:Advertise")}</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/advertise/2019.html" className="dark" target="_self">{i18next.t("footer:Thanks")}</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              <a href="/tools" className="dark" target="_self">{i18next.t("footer:Tools")}</a>
              {" "}&nbsp;{" "}
              <span className="snow">·</span>
              {" "}&nbsp;{" "}
              {this.state.online}{" "}{i18next.t("footer:Online")}
            </strong>
            {" "}&nbsp;{" "}
            <span className="fade">{i18next.t("footer:Highest")}{" "}{this.state.highest}</span>
            {" "}&nbsp;{" "}
            <span className="snow">·</span>
            {" "}&nbsp;{" "}
            <a href="/select/language" className="f11">
              <img src={Setting.getStatic("/static/img/language.png")} width="16" align="absmiddle" id="ico-select-language" />
              {" "}&nbsp;{" "}
              {i18next.t("footer:Select Language")}
            </a>
            <div className="sep20" />
            {i18next.t("footer:Community of Creators")}
            <div className="sep5" />
            World is powered by code
            <div className="sep20" />
            <span className="small fade">
              VERSION: <a href={`${Conf.GithubRepo}/commit/${this.state.version}`}>{this.state.version.substring(0, 7)}</a> · {loadingTime}ms · UTC {utcTime} · PVG {pvgTime} · LAX {laxTime} · JFK {jfkTime}
              <br />
              ♥ Do have faith in what you're doing.
            </span>
            <div className="sep10" />
          </div>
        </div>
      </div>
    )
  }

}

export default Footer;
