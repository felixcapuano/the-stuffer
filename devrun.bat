wt -d . docker-compose up ; -d ./thestuffer/app "\Program Files\nodejs\npm.cmd" run dev-start ; sp -H -d ./auth/app "\Program Files\nodejs\npm.cmd" run dev-start ; sp -H -d ./stuff/app "\Program Files\nodejs\npm.cmd" run dev-start