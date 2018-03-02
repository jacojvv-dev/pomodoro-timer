class PomodoroEvents {
    static pomodoroTick(data = {}) {


        detail = {}

        return new CustomEvent(
            "pomodoroTick",
            {
                detail: {
                    message: "PomodoroTicked",
                    time: new Date(),
                    ...data
                },
                bubbles: false,
                cancelable: true
            }
        );
    }
}

module.exports = PomodoroEvents;