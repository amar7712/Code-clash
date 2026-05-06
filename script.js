import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const quizzes = {
  1: [
    { q: "2+2?", o: ["3", "4", "5", "6"], a: 1 },
    { q: "Capital of India?", o: ["Delhi", "Mumbai", "Chennai", "Kolkata"], a: 0 }
  ],
  2: [
    { q: "HTML?", o: ["Markup", "Style", "DB", "None"], a: 0 }
  ],
  3: [
    { q: "5×5?", o: ["20", "25", "30", "15"], a: 1 }
  ]
};

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [index, setIndex] = useState(0);

  const currentQuiz = quizzes[level];

  // 🔓 Unlock next level
  const nextLevel = () => {
    if (level < Object.keys(quizzes).length) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setUnlockedLevel(Math.max(unlockedLevel, newLevel));
      setBadges([...badges, `Unlocked Level ${newLevel} 🔓`]);
      setIndex(0);
    } else {
      setScreen("menu");
    }
  };
  function selectAnswer(i, el){
  let correct = quiz[index].a;
  let options = document.querySelectorAll(".option");

  // Disable further clicks
  options.forEach(opt => opt.onclick = null);

  if(i === correct){
    el.classList.add("correct");
    score++; 
    points += 10;
    checkLevel();
    updateStats();

    // ✅ Auto move after short delay
    setTimeout(() => {
      nextQuestion();
    }, 800); // 0.8 sec delay for animation

  } else {
    el.classList.add("wrong");
    options[correct].classList.add("correct");
    updateStats();
  }
}

  // ✅ Answer selection
  const selectAnswer = (i) => {
    if (i === currentQuiz[index].a) {
      setPoints(points + 10);
    }
  };

  // Next question
  const nextQuestion = () => {
    if (index + 1 < currentQuiz.length) {
      setIndex(index + 1);
    } else {
      nextLevel();
    }
  };
  // 🎮 MENU SCREEN
  if (screen === "menu") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎮 Select Level</Text>

        {Object.keys(quizzes).map((lvl) => {
          const required = (lvl - 1) * 20;
          const locked = lvl > unlockedLevel;

          return (
            <TouchableOpacity
              key={lvl}
              style={[styles.button, locked && styles.locked]}
              disabled={locked}
              onPress={() => {
                setLevel(Number(lvl));
                setIndex(0);
                setScreen("quiz");
              }}
            >
              <Text style={styles.btnText}>
                Level {lvl} (⭐ {required})
              </Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.subtitle}>🏅 Badges</Text>
        {badges.map((b, i) => (
          <Text key={i} style={styles.badge}>{b}</Text>
        ))}
      </View>
    );
  }

  // 🧠 QUIZ SCREEN
  return (
    <View style={styles.container}>
      <Text style={styles.stats}>
        ⭐ {points} | 🏆 Level {level}
      </Text>

      <Text style={styles.question}>
        {currentQuiz[index].q}
      </Text>

      {currentQuiz[index].o.map((opt, i) => (
        <TouchableOpacity
          key={i}
          style={styles.option}
          onPress={() => selectAnswer(i)}
        >
          <Text style={styles.btnText}>{opt}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={nextQuestion}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2b64",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20
  },
  subtitle: {
    marginTop: 20,
    color: "white"
  },
  stats: {
    color: "white",
    marginBottom: 10
  },
  question: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#ff7eb3",
    padding: 12,
    margin: 8,
    borderRadius: 8,
    width: "80%",
    alignItems: "center"
  },
  locked: {
    backgroundColor: "gray"
  },
  option: {
    backgroundColor: "#ffffff22",
    padding: 12,
    margin: 5,
    borderRadius: 8,
    width: "80%",
    alignItems: "center"
  },
  btnText: {
    color: "white"
  },
  badge: {
    backgroundColor: "gold",
    padding: 5,
    margin: 5,
    borderRadius: 10
  }}
